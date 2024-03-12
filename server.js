const express = require("express");
const inquirer = require("inquirer");

const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Oreo0912!",
        database: "company_db"
    },
    console.log("Connected to the company_db database.")
);

const viewAllEmployees = () => {
    db.query("SELECT * FROM employee", (err, rows) => {
        console.table(rows);
    });
}

const viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, rows) => {
        console.table(rows);
    });
}

const viewAllRoles = () => {
    db.query("SELECT * FROM role", (err, rows) => {
        console.table(rows);
    });
}

// https://javascript.plainenglish.io/how-to-inquirer-js-c10a4e05ef1f

return inquirer
    .prompt([
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Quit"
            ]
        }
    ])
    .then((answers) => {
        if(answers.choices === "View All Employees") {
            viewAllEmployees();
        } else if(answers.choices === "View All Departments") {
            viewAllDepartments();
        } else if(answers.choices === "View All Roles") {
            viewAllRoles();
        }
    });

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});