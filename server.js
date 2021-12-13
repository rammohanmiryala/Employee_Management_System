const express = require('express');
const inquirer = require('inquirer');
const figlet = require('figlet');

const fs = require("fs");

// Import and require mysql2
const mysql = require('mysql2');
const {
  Console
} = require('console');

const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

// connect database connection

const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'Employee_Management_System_db'
  },
  console.log(`Connected to the Employee_Management_System_db database.`)

);

employee();

function employee() {
  inquirer.prompt([{
      type: "list",
      name: "answers",
      message: "what would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role"
      ]
    }])
    .then((userinput) => {

      if (userinput.answers === "view all departments") {

        viewAllDepartments();

      }
      if (userinput.answers === "view all roles") {

        viewallroles();

      }
      if (userinput.answers === "view all employees") {

        viewallemployees();

      }
      if (userinput.answers === "add a department") {

        adddepartment();

      }
      if (userinput.answers === "add a role") {

        addarole();

      }
      if (userinput.answers === "add an employee") {

        addemployee();

      }

      if (userinput.answers === "update an employee role") {

        updateemployeerole();

      }
    })
}

function viewAllDepartments() {
  db.query(`SELECT id AS DepartmentID , department_name AS DepartmentName FROM employee_management_system_db.department`, (err, data) => {
    if (err) throw err;
    console.table(data);
    employee()
  });
}
// THEN I am presented with the job title, role id, the department 
// that role belongs to, and the salary for that role
function viewallroles() {
  db.query(`SELECT * FROM employee_management_system_db.roles;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    employee()
  });
}

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewallemployees() {
  db.query(`SELECT first_name, last_name,r.title, r.salary,d.department_name,manager_id as manager
  FROM employee_management_system_db.employee e LEFT JOIN employee_management_system_db.roles r ON e.role_id = r.role_id LEFT JOIN employee_management_system_db.department d ON d.id = r.department_id;
  `, (err, data) => {
    if (err) throw err;
    console.table(data);
    employee()
  });
}

function adddepartment() {
  inquirer.prompt([{
      type: "input",
      name: "answers",
      message: " name of the department?"

    }])
    .then((userinput) => {
      db.query('INSERT INTO department (department_name) VALUES (?)', (userinput.answers), (err, data) => {
        if (err) throw err;
        
        console.log("department name is added to department table")
        employee()
      });
    })
}

function addarole() {
  db.promise().query('SELECT department_name,id  FROM department')
    .then(([departmentdata]) => {

      // const department = departmentdata
      const departmenttable = departmentdata.map(({
        name,
        id
      }) => ({
        name: name,
        value: id,
      }))
      inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the title of this new role?"
          },
          {
            type: "input",
            name: "salary",
            message: "what is the salary of new role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "what department role is in ?",
            choices: departmenttable,
          }
        ])
        .then((userinputs) => {
          db.query('INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?);', [userinputs.title, userinputs.salary, userinputs.department_id], (err, data) => {
            if (err) throw err;
            console.log("new role added")
            employee()
          })
        })
    })
}

function addemployee() {
  db.promise().query('SELECT role_id, title FROM roles')
    .then(([rolesdata]) => {

      // const department = departmentdata
      const rolestable = rolesdata.map(({
        role_id,
        title
      }) => ({
        value: role_id,
        name: title,

      }))

      db.promise().query('SELECT employee_id, concat(first_name," ",last_name) as fullname FROM employee')
        .then(([employeedata]) => {

          // const department = departmentdata
          const employeetable = employeedata.map(({
            fullname,
            employee_id
          }) => ({
            name: fullname,
            value: employee_id,
          }))

          inquirer.prompt([{
                type: "input",
                name: "first_name",
                message: "employee first name?"
              },
              {
                type: "input",
                name: "last_name",
                message: "employee last name?"
              },
              {
                type: "list",
                name: "roleid",
                message: "whats the employee role ?",
                choices: rolestable

              },
              {
                type: "list",
                name: "managerid",
                message: "who is the manager?",
                choices: employeetable
              }
            ])
            .then((userinputs) => {
              db.query('INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES (?, ?, ?,?);', [userinputs.first_name, userinputs.last_name, userinputs.roleid, userinputs.managerid ], (err, data) => {
                if (err) throw err;
                console.log("new role added")
                employee()
              })
            })
        })
    })
}

function updateemployeerole() {
  db.promise().query('SELECT employee_id, concat(first_name, " ",last_name) AS fullname from employee')
    .then(([employename]) => {
      const nameofemployee = employename.map(({
        id,
        fullname
      }) => ({
        value: id,
        name: fullname
      }));

      //update the role
      db.promise().query('SELECT role_id, title AS Role From roles')
        .then(([employerole]) => {

          const whichrole = employerole.map(({
            id,
            Role
          }) => ({
            value: id,
            name: Role
          }));

          inquirer.prompt([
            {
              type: "list",
              name: "role",
              message: " what role  you want to assign to employee?",
              choices: whichrole
            },
            {
              type: "list",
              name: "employee_n",
              message: "name of the employee you want to update?",
              choices: nameofemployee
            }
          ]).then(userinputs => {
            db.query('UPDATE employee SET role_id = ? WHERE employee_id = ?', [userinputs.role, userinputs.employee_n], (err, data) => {
              console.log(data)
              if (err) throw err;
              console.log("employee role  is updated successfully")
              employee()
            })
          })
        })
    })
}