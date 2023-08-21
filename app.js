const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // 
    password: 'danceMachine564', // 
    database: 'employee_tracker_db'
  });