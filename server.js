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
employee()

function employee() {
  inquirer.prompt([{
      type: "list",
      name: "answers",
      message: "what whould you like to do?",
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
  db.query(`SELECT roles.id,title,department.department_name as DepartmentName ,salary
  FROM employee_management_system_db.department  right JOIN  employee_management_system_db.roles
  ON department.id = roles.department_id;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    employee()
  });
}

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewallemployees() {
  db.query(`SELECT first_name, last_name,r.title, r.salary,d.department_name,manager_id as manager
  FROM employee_management_system_db.employee e LEFT JOIN employee_management_system_db.roles r ON e.role_id = r.id LEFT JOIN employee_management_system_db.department d ON d.id = r.department_id;
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
        console.table(data);
        console.log(userinput.answers + "is added to department table")
        employee()
      });


    })

}

function addarole() {
  db.promise().query('SELECT department.id, department.name FROM department')
    .then(([departmentdata]) => {

      // const department = departmenttable
      let departmentrole = departmentdata.map(({
        id,
        name
      }) => ({
        value: id,
        name: name,
        
      }))

    })

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
        choices: departmentrole
      }
    ])
    .then((userinputs) => {
      db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);', [userinputs.title, userinputs.salary, userinputs.department_id], (err, results) => {
        if (err) throw err;
        console.log("new role added")
        employee()
      })
    })
}