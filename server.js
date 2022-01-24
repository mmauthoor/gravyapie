const { response } = require("express");
const express = require("express");
const app = express();
const testServo = require('./models/data.js')
const { Pool } = require('pg');
const pool = new Pool({
    database: 'gravyapie',
    username: 'root',
    password: 'password',
});

app.use(express.json());
// app.use(express.static("public"));



app.get("/api/stations/all", (req, res) => {
    let sql = "select * from servos;"
    pool.query(sql, params = [], (err, dbres) => {
        res.send(dbres)
    });
});

app.get("/", (req, res) => {

});

app.listen(8080, () => {
    console.log("server listening on port 8080")
});