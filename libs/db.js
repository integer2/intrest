import mysql from 'mysql2/promise';
import dbConfig from '../config/db.config';

// create a singleton connection pool and export as default
export default mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
