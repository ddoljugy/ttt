import formidable from 'formidable';
import AWS from 'aws-sdk';
import { dbConnect } from '../../../utils/dbConnect';
import Car from '../../../models/Car';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async (req, res) => {
  await dbConnect();

  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error parsing the files' });
    }

    const file = files.image;
    const fileContent = fs.readFileSync(file.filepath);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.originalFilename,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    try {
      // S3에 파일 업로드
      const data = await s3.upload(params).promise();
      console.log('File uploaded successfully:', data);

      
      const { brand, model, made_year, price } = fields;
      const car = new Car(null, brand, model, made_year, price); // id는 NULL로 설정함
      await car.save();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      return res.status(500).json({ success: false, message: 'Error uploading file' });
    }
  });
};
