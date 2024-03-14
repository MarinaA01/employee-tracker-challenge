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
        } else if(answers.choices === "Add Employee") {
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter the employee's first name:"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Enter the employee's last name:"
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "Enter the employee's role ID:"
                },
                {
                    type: "input",
                    name: "manager_id",
                    message: "Enter the employee's manager ID:"
                }
            ])
            .then((answers) => {
                db.query("INSERT INTO employee SET ?", answers, (err, res) => {
                    if(err) throw err;
                    console.log("Employee added!");
                });
            });
        } else if(answers.choices === "Add Department") {
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter the department's name:"
                }
            ])
        } else if(answers.choices === "Add Role") {
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the role's title:"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the role's salary:"
                },
                {
                    type: "input",
                    name: "department_id",
                    message: "Enter the role's department ID:"
                }
            ]) 
            .then((answers) => {
                db.query("INSERT INTO role SET ?", answers, (err, res) => {
                    if(err) throw err;
                    console.log("Role added!");
                });
            });
        } else if(answers.choices === "Update Employee Role") {
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "employee_id",
                    message: "Enter the employee's ID:"
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "Enter the employee's new role ID:"
                }
            ])
            .then((answers) => {
                db.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.employee_id], (err, res) => {
                    if(err) throw err;
                    console.log("Employee role updated!");
                });
            });
        } else if(answers.choices === "Quit") {
            return;
        } else {
            console.log("Invalid input. Please try again.");
        }
    });


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

