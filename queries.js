const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'danceMachine564',
    database: 'employee_tracker_db'
  });

async function viewAllDepartments() {
  const [rows] = await connection.query('SELECT id, name FROM department');
  return rows;
}

async function viewAllRoles() {
  const [rows] = await connection.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `);
  return rows;
}

async function viewAllEmployees() {
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

async function addDepartment(departmentName) {
  await connection.query(
    'INSERT INTO department (name) VALUES (?)',
    [departmentName]
  );
}

async function addRole(title, salary, departmentId) {
  await connection.query(
    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    [title, salary, departmentId]
  );
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  await connection.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [firstName, lastName, roleId, managerId]
  );
}

async function updateEmployeeRole(employeeId, newRoleId) {
  await connection.query(
    'UPDATE employee SET role_id = ? WHERE id = ?',
    [newRoleId, employeeId]
  );
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
