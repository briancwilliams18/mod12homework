const inquirer = require('inquirer');
const queries = require('./queries');

async function startApp() {
  try {
    const action = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    });

    switch (action.action) {
      case 'View all departments':
        const departments = await queries.viewAllDepartments();
        console.table(departments);
        break;

      case 'View all roles':
        const roles = await queries.viewAllRoles();
        console.table(roles);
        break;

      case 'View all employees':
        const employees = await queries.viewAllEmployees();
        console.table(employees);
        break;

      case 'Add a department':
        const departmentPrompt = await inquirer.prompt({
          name: 'departmentName',
          type: 'input',
          message: 'Enter the name of the department:'
        });
        await queries.addDepartment(departmentPrompt.departmentName);
        console.log('Department added successfully.');
        break;

      case 'Add a role':
        const rolePrompt = await inquirer.prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:'
          },
          {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:'
          },
          {
            name: 'departmentId',
            type: 'input',
            message: 'Enter the department ID for the role:'
          }
        ]);
        await queries.addRole(rolePrompt.title, rolePrompt.salary, rolePrompt.departmentId);
        console.log('Role added successfully.');
        break;

      case 'Add an employee':
        const employeePrompt = await inquirer.prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name of the employee:'
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name of the employee:'
          },
          {
            name: 'roleId',
            type: 'input',
            message: 'Enter the role ID for the employee:'
          },
          {
            name: 'managerId',
            type: 'input',
            message: 'Enter the manager ID for the employee (if applicable):'
          }
        ]);
        await queries.addEmployee(
          employeePrompt.firstName,
          employeePrompt.lastName,
          employeePrompt.roleId,
          employeePrompt.managerId
        );
        console.log('Employee added successfully.');
        break;

      case 'Update an employee role':
        const updatePrompt = await inquirer.prompt([
          {
            name: 'employeeId',
            type: 'input',
            message: 'Enter the ID of the employee you want to update:'
          },
          {
            name: 'newRoleId',
            type: 'input',
            message: 'Enter the new role ID for the employee:'
          }
        ]);
        await queries.updateEmployeeRole(updatePrompt.employeeId, updatePrompt.newRoleId);
        console.log('Employee role updated successfully.');
        break;

      case 'Exit':
        console.log('Goodbye!');
        return;

      default:
        console.log('Invalid action');
    }

    // Recursive call to continue the app
    await startApp();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the startApp function to begin the application
startApp();
