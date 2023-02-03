const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoletable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password",
  database: "department_db",
});

function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "main",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then((ans) => {
      switch (ans.main) {
        case "view all departments":
          console.log("viewing all departments");
          db.query("SELECT * FROM departments", (err, results) => {
            if (err) {
              throw err;
            } else {
              console.table(results);
              initialPrompt();
            }
          });
          break;
        case "view all roles":
          console.log("viewing all roles");
          db.query(
            "SELECT title as 'Job Title', roles.id AS 'Role ID', departments.id AS 'department ID', salary AS 'salary' FROM departments JOIN roles ON departments.id = roles.department_id;",
            (err, results) => {
              if (err) {
                throw err;
              }
              console.table(results);
              initialPrompt();
            }
          );
          break;
        case "view all employees":
          console.log("viewing all employees");
          db.query("SELECT employees.id as 'Employee ID', first_name AS 'First Name', last_name AS 'Last Name', title AS 'Job', department_id AS 'Department ID', salary AS 'Salary', manager_id AS 'Managers ID' FROM roles JOIN employees ON roles.id = employees.role_id;",(err, results) => {
            if (err) {
              throw err;
            }
            console.table(results);
            initialPrompt();
          });
          break;
        case "add a department":
          console.log("adding a department");
          addDepartment();
          break;
        case "add a role":
          console.log("adding a role");
          addRole();
          break;
        case "add an employee":
          console.log("adding an employee");
          addEmployee();
          break;
        case "update an employee role":
          console.log("updating an employee role");
          updateEmployee();
          break;
        case "exit":
          console.log("Goodbye!");
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What department do you want to add?",
      },
    ])
    .then((ans) => {
      db.query(
        "INSERT INTO departments(name) VALUES(?);",
        [ans.departmentName],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.table(results);
          initialPrompt();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What role do you want to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is this departments ID?",
      },
    ])
    .then((ans) => {
      db.query(
        "INSERT INTO roles(title,salary,department_id) VALUES(?,?,?);",
        [ans.roleName, ans.salary, ans.departmentId],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.table(results);
          initialPrompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the first name of this employee?",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the last name of this employee?",
      },
      {
        type: "input",
        name: "employeeRole",
        message: "What is the role number for this employee?",
      },
      {
        type: "input",
        name: "managerId",
        message:
          "What is the mployee number of this employees manager? If they are a manager type NULL",
      },
    ])
    .then((ans) => {
      db.query(
        "INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?);",
        [
          ans.employeeFirstName,
          ans.employeeLastName,
          ans.employeeRole,
          ans.managerId,
        ],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.table(results);
          initialPrompt();
        }
      );
    });
}

function updateEmployee() {
  db.query(
    'SELECT employees.id as "Employee ID", first_name AS "First Name", last_name AS "Last Name", title AS "Job Title", department_id AS "Department ID", salary AS "Salary", manager_id AS "Manager ID" FROM roles JOIN employees ON roles.id = employees.role_id;',
    (err, results) => {
      if (err) {
        throw err;
      }
      console.table(results);
    }
  );
  db.query(
    "SELECT title as 'Job Title', roles.id AS 'Role ID', departments.id AS 'department ID', salary AS 'salary' FROM departments JOIN roles ON departments.id = roles.department_id;",
    (err, results) => {
      if (err) {
        throw err;
      }
      console.table(results);
    }
  );

  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message:
          "What is the employee ID nunmber for the employee you would like to update? ",
      },
      {
        type: "input",
        name: "newRole",
        message: "What is this employee's new role?",
      },
    ])
    .then((ans) => {
      db.query(
        "UPDATE employees SET role_id = ? WHERE id = ?;",
        [ans.newRole, ans.employeeId],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.table(results);
          initialPrompt();
        }
      );
    });
}

initialPrompt();
