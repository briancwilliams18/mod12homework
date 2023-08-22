const mysql = require('mysql2/promise');

async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'danceMachine564',
    database: 'employee_tracker_db'
  });
  return connection;
}

async function viewAllDepartments(connection) {
  const [rows] = await connection.query('SELECT id, name FROM department');
  return rows;
}

async function viewAllRoles(connection) {
  const [rows] = await connection.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `);
  return rows;
}

async function viewAllEmployees(connection) {
  const [rows] = await connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
  return rows;
}

async function addDepartment(connection, departmentName) {
  await connection.query(
    'INSERT INTO department (name) VALUES (?)',
    [departmentName]
  );
}

async function addRole(connection, title, salary, departmentId) {
  await connection.query(
    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    [title, salary, departmentId]
  );
}

async function addEmployee(connection, firstName, lastName, roleId, managerId) {
  await connection.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [firstName, lastName, roleId, managerId]
  );
}

async function updateEmployeeRole(connection, employeeId, newRoleId) {
  await connection.query(
    'UPDATE employee SET role_id = ? WHERE id = ?',
    [newRoleId, employeeId]
  );
}

module.exports = {
  createConnection,
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
