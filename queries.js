const mysql = require('mysql2/promise');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'danceMachine564',
  database: 'employee_tracker_db'
});

const query = util.promisify(connection.query).bind(connection);
