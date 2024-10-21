import mysql from 'mysql2/promise';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

// 서울 리전 DB 연결 설정
const seoulConnectionConfig = {
  host: process.env.MYSQL_HOST_SEOUL,
  user: process.env.MYSQL_USER_SEOUL,
  password: process.env.MYSQL_PASSWORD_SEOUL,
  database: process.env.MYSQL_DATABASE_SEOUL,
};

// 상파울루 리전 DB 연결 설정
const saoPauloConnectionConfig = {
  host: process.env.MYSQL_HOST_SAO_PAULO,
  user: process.env.MYSQL_USER_SAO_PAULO,
  password: process.env.MYSQL_PASSWORD_SAO_PAULO,
  database: process.env.MYSQL_DATABASE_SAO_PAULO,
};

// S3 클라이언트 설정 (서울 리전)
const s3Seoul = new AWS.S3({
  region: 'ap-northeast-2',
});

// S3 클라이언트 설정 (상파울루 리전)
const s3SaoPaulo = new AWS.S3({
  region: 'sa-east-1',
});

// 차량 이동 처리 함수 (핸들러)
export default async function handler(req, res) {
  const { carId, sourceRegion, destinationRegion } = req.body;

  let sourceConnection, destinationConnection;

  try {
    let sourceConnectionConfig, destinationConnectionConfig, s3Source, s3Destination;

    if (sourceRegion === 'seoul') {
      sourceConnectionConfig = seoulConnectionConfig;
      s3Source = s3Seoul;
    } else if (sourceRegion === 'sao_paulo') {
      sourceConnectionConfig = saoPauloConnectionConfig;
      s3Source = s3SaoPaulo;
    }

    if (destinationRegion === 'seoul') {
      destinationConnectionConfig = seoulConnectionConfig;
      s3Destination = s3Seoul;
    } else if (destinationRegion === 'sao_paulo') {
      destinationConnectionConfig = saoPauloConnectionConfig;
      s3Destination = s3SaoPaulo;
    }

    // DB 연결
    sourceConnection = await mysql.createConnection(sourceConnectionConfig);
    destinationConnection = await mysql.createConnection(destinationConnectionConfig);

    // 트랜잭션 시작
    await sourceConnection.beginTransaction();
    await destinationConnection.beginTransaction();

    // 넘겨줄 국가에서 차량 보내기 (삭제)
    await sourceConnection.execute(
      `DELETE FROM cars WHERE id = ?`,
      [carId]
    );

    // S3에서 데이터를 불러오기 (sourceRegion)
    const carData = await getCarDataFromS3(s3Source, carId);

    // 넘겨줄 국가의 차량을 받은 국가로 이동 (중복 방지 위해 ON DUPLICATE KEY UPDATE 사용)
    await destinationConnection.execute(
      `INSERT INTO cars (id, brand, model, made_year, price)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       brand = VALUES(brand), model = VALUES(model), made_year = VALUES(made_year), price = VALUES(price)`,
      [carData.id, carData.brand, carData.model, carData.made_year, carData.price]
    );

    // 트랜잭션 커밋 (모든 작업이 성공하면)
    await sourceConnection.commit();
    await destinationConnection.commit();

    // **성공적으로 차량을 이동 처리한 후 `/show` 페이지로 리다이렉트**
    res.redirect('/show');

  } catch (error) {
    // 오류 발생 시 트랜잭션 롤백
    if (sourceConnection) await sourceConnection.rollback();
    if (destinationConnection) await destinationConnection.rollback();
    
    res.status(500).json({ error: 'Failed to move car', details: error.message });
  } finally {
    if (sourceConnection) await sourceConnection.end();
    if (destinationConnection) await destinationConnection.end();
  }
}

// S3에서 데이터를 불러오는 함수 (getCarDataFromS3)
async function getCarDataFromS3(s3Client, carId) {
  const s3Key = `extracted_cars/${carId}.json`;

  try {
    const params = {
      Bucket: process.env.S3_BUCKET, // S3 버킷 이름
      Key: s3Key,                   // S3에서 가져올 파일 경로 (차량 ID 기반)
    };

    const data = await s3Client.getObject(params).promise(); // S3에서 데이터를 가져오는 부분
    const carData = JSON.parse(data.Body.toString('utf-8')); // 데이터를 JSON으로 변환

    return carData; // 차량 데이터를 반환
  } catch (error) {
    console.error(`Failed to get car data from S3: ${error.message}`);
    throw new Error('Failed to retrieve car data from S3');
  }
}
