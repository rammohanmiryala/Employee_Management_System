const express = require('express');
const inquirer = require('inquirer');
const db = require('./config/connection');
const fs = require("fs");

// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

const employee = () =>
  inquirer.prompt([{

      type: "list",
      name: "answers",
      message: "what whould you like to do?",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    }

  ])
  .then((answers) => {

    if (answers === "view all departments") {

    }
    if (answers === "view all roles") {

    }

    if (answers === "view all employees") {

    }

    if (answers === "add a department") {

    }

    if (answers === "add a role") {

    }

    if (answers === "add an employee") {

    }
    if (answers === "update an employee role") {

    }



    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {

    } else {

    }
  });



employee();












// const employee = () => {
//   inquirer.prompt(
//       [{

//           type: "list",
//           name: "datainput",
//           message: "what whould you like to do?",
//           choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
//         }


//       ])
//     .then((answers) => {
//       // Use user feedback for... whatever!!
//     })
//     .catch((error) => {
//       if (error.isTtyError) {
//         // Prompt couldn't be rendered in the current environment
//       } else {
//         // Something else went wrong
//       }

//     })

// }
// 




// Hardcoded query: DELETE FROM course_names WHERE id = 3;

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });