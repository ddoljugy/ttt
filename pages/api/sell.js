import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, sourceRegion, destinationRegion } = req.body;

        // sourceRegion에 따라 MySQL 호스트 설정
        const endpoint = sourceRegion === 'seoul' 
            ? process.env.MYSQL_HOST_SEOUL 
            : process.env.MYSQL_HOST_SAO_PAULO;

        // MySQL 연결 설정
        const connection = mysql.createConnection({
            host: endpoint,
            user: sourceRegion === 'seoul' 
                ? process.env.MYSQL_USER_SEOUL 
                : process.env.MYSQL_USER_SAO_PAULO,
            password: sourceRegion === 'seoul' 
                ? process.env.MYSQL_PASSWORD_SEOUL 
                : process.env.MYSQL_PASSWORD_SAO_PAULO,
            database: sourceRegion === 'seoul' 
                ? process.env.MYSQL_DATABASE_SEOUL 
                : process.env.MYSQL_DATABASE_SAO_PAULO,
        });

        // MySQL 연결 및 쿼리 처리
        connection.connect(err => {
            if (err) {
                console.error('Error connecting to the database:', err);
                return res.status(500).json({ error: 'Failed to connect to database' });
            }

            const query = `UPDATE cars SET region = ? WHERE id = ?`;
            connection.query(query, [destinationRegion, carId], (error, results) => {
                if (error) {
                    console.error('Error moving car:', error);
                    return res.status(500).json({ error: 'Failed to move car' });
                }

                res.status(200).json({ message: 'Car moved successfully' });
            });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
