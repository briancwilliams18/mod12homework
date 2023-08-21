const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',     // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'employee_tracker_db'
  });