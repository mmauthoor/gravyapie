const { response } = require("express");
const express = require("express");
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
    database: 'gravyapie',
    // username: 'harry',
    // password: 'password',
});

app.use(express.json());
app.use(express.static("public"));

// Helper functions
function sortObject(object) {
    let sortable = [];
    for (var key in object) {
        sortable.push([key, object[key]]);
    }
    sortable.sort((a, b) => {
        return (a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0));
    });
    let orderedList = {};
    for (var i = 0; i < sortable.length; i++) {
        orderedList[sortable[i][0]] = sortable[i][1];
    }
    return orderedList;
}

app.get("/", (req, res) => {
    res.send("home");
});

app.get("/api/owners", (req, res) => {
    let sql = "SELECT owner FROM servos;"
    pool.query(sql, params = [], (err, dbres) => {
        let allOwners = dbres.rows;

        let uniqueOwners = {};
        allOwners.forEach(obj => {
            if (uniqueOwners[`${obj.owner}`] === undefined) {
                uniqueOwners[`${obj.owner}`] = 1;
            } else {
                uniqueOwners[`${obj.owner}`]++;
            }
        })
        res.send(sortObject(uniqueOwners))
    });
});

app.get("/api/stations/random", (req, res) => {
    let sql = "SELECT * FROM servos;"
    pool.query(sql, params = [], (err, dbres) => {
        let stations = dbres.rows;
        let rand = Math.floor(Math.random() * stations.length);
        res.send(stations[rand]);
    });
});

app.get("/api/stations/all", (req, res) => {
    let sql = "SELECT * FROM servos;"
    pool.query(sql, params = [], (err, dbres) => {
        res.send(dbres)
    });
});

app.listen(8080, () => {
    console.log("server listening on port 8080 url: http://localhost:8080/")
});