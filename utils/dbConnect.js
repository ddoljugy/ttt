const mysql = require("mysql2/promise");

const dbConnect = async (region) => {
  let connectionConfig;

  if (region === "seoul") {
    connectionConfig = {
      host: process.env.MYSQL_HOST_SEOUL,
      user: process.env.MYSQL_USER_SEOUL,
      password: process.env.MYSQL_PASSWORD_SEOUL,
      database: process.env.MYSQL_DATABASE_SEOUL,
    };
  } else if (region === "sao_paulo") {
    connectionConfig = {
      host: process.env.MYSQL_HOST_SAO_PAULO,
      user: process.env.MYSQL_USER_SAO_PAULO,
      password: process.env.MYSQL_PASSWORD_SAO_PAULO,
      database: process.env.MYSQL_DATABASE_SAO_PAULO,
    };
  } else {
    throw new Error("Invalid region specified.");
  }

  try {
    const connection = mysql.createPool(connectionConfig);
    await connection.getConnection();
    console.log(`${region} MySQL connection established`);
    return connection;
  } catch (error) {
    console.error(`${region} Database connection error:`, error);
    throw error;
  }
};

module.exports = { dbConnect };
