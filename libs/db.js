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

    // this.connection = mysql.createPool({
    //   host: dbConfig.host,
    //   user: dbConfig.user,
    //   password: dbConfig.password,
    //   database: dbConfig.database,
    //   waitForConnections: true,
    //   connectionLimit: 10,
    //   queueLimit: 0,
    // });

    this.connection = mysql.createConnection({
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
    const [result] = await connection.query(`CALL getUserInfo(?, ?)`, [
      user_id,
      email,
    ]);
    return result[0][0];
  }

  async updateUserInfo(
    user_id,
    email,
    username,
    name,
    birthday,
    gender,
    bio,
    img_url
  ) {
    const connection = await this.getConnection();
    const [result] = await connection.query(
      'CALL updateUserInfo(?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, email, username, name, birthday, gender, bio, img_url]
    );
    return result;
  }

  async getUserProfile(username) {
    const connection = await this.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM profile_info WHERE username = ?',
      [username]
    );
    return result;
  }

  async getAllPostByUser(username) {
    const connection = await this.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM all_post WHERE username = ? ORDER BY created_at DESC',
      [username]
    );
    return result;
  }

  async checkIsFollowed(follower_id, user_id) {
    const connection = await this.getConnection();
    const [result] = await connection.execute(
      'SELECT isFollowed(?, ?) AS isFollowed',
      [follower_id, user_id]
    );
    return result;
  }

  async updatePost(post_id, desc) {
    const connection = await this.getConnection();
    const [result] = await connection.execute('CALL updatePost(?, ?)', [
      post_id,
      desc,
    ]);
    return result;
  }

  async getPost(post_id) {
    const connection = await this.getConnection();
    const [result] = await connection.execute('CALL getPost(?)', [post_id]);
    return result[0][0];
  }

  async deletePost(post_id) {
    const connection = await this.getConnection();
    const [result] = await connection.execute('CALL deletePost(?)', [post_id]);
    return result;
  }

  async getAllNotFollowed(user_id) {
    const connection = await this.getConnection();
    const [result] = await connection.execute('CALL getAllNotFollowed(?)', [
      user_id,
    ]);
    return result[0];
  }

  async getAllPostsForHome(user_id) {
    const connection = await this.getConnection();
    const [result] = await connection.execute('CALL getAllPostsForHome(?)', [
      user_id,
    ]);
    return result[0];
  }

  async getAllPostsForExplore(limit, offset) {
    const connection = await this.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM user_post ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return result;
  }
}

const db = new DbConnection();

export default db;
