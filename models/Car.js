const mysql = require("mysql2/promise");

// MySQL 연결 설정
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Car {
  constructor(id, brand, model, made_year, price) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.made_year = made_year;
    this.price = price;
  }

  // 데이터베이스에 자동차 정보 저장
  async save() {
    const [rows] = await connection.query(
      "INSERT INTO car_listings (brand, model, made_year, price) VALUES (?, ?, ?, ?)",
      [this.brand, this.model, this.made_year, this.price]
    );
    return rows.insertId;
  }

  // 모든 자동차 정보 조회
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM car_listings");
    return rows;
  }
}

module.exports = Car;
