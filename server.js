const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || '3000';
const app = express();
const inquire = require("inquirer")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


function initialPrompt() {
    inquire.prompt([
        {

        }
    ])
}


app.listen(PORT, () =>console.log(`App listening at http://localhost:PORT 🚀`));
