const { response } = require("express");
const express = require("express");
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
    database: 'gravyapie',
    username: 'root',
    password: 'password',
});

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("home")
});

app.get("/api/owners", (req, res) => {
    let sql = "select owner from servos;"
    pool.query(sql, params = [], (err, dbres) => {
        let allOwners = dbres.rows
        let uniqueOwners = {}
        allOwners.forEach(obj => {
            if (uniqueOwners[`${obj.owner}`] === undefined) {
                uniqueOwners[`${obj.owner}`] = 1
            } else {
                uniqueOwners[`${obj.owner}`]++
            }
        })
        res.send(uniqueOwners)
    });
})


app.get("/api/stations/all", (req, res) => {
    let sql = "select * from servos;"
    pool.query(sql, params = [], (err, dbres) => {
        res.send(dbres)
    });
});


app.listen(8080, () => {
    console.log("server listening on port 8080 url: http://localhost:8080/")
});