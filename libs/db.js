import mysql from 'mysql2/promise';
import dbConfig from '../config/db.config';

// // create a singleton connection pool and export as default
// export default mysql.createPool({
//   host: dbConfig.host,
//   user: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// Craete a db connection class with singleton pattern
class DbConnection {
  constructor() {
    this.connection = null;
  }

  async getConnection() {
    if (this.connection) return this.connection;

    this.connection = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    return this.connection;
  }

  async createNewUser(username, email, password) {
    const connection = await this.getConnection();
    const [result] = await connection.query(`CALL createNewUser(?, ?, ?)`, [
      username,
      email,
      password,
    ]);

    return result;
  }

  async userLogin(email, password) {
    const connection = await this.getConnection();
    const [result] = await connection.query(
      `CALL loginUser('${email}', '${password}')`
    );

    return result[0][0];
  }

  async createPost(authod_id, img_url, desc) {
    const connection = await this.getConnection();
    const [result] = await connection.query(`CALL createPost(?, ?, ?)`, [
      authod_id,
      img_url,
      desc,
    ]);

    return result;
  }

  async getUser(user_id, email) {
    const connection = await this.getConnection();
    const [result] = await connection.query(`CALL getUser(?, ?)`, [
      user_id,
      email,
    ]);
    return result[0][0];
  }
}

const db = new DbConnection();

export default db;
