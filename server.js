const express = require("express");
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
    database: 'gravyapie',
});


app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {

    const testServo = {
        "OBJECTID": 1,
        "FEATURETYPE": "Petrol Station",
        "DESCRIPTION": "An establishment where a range of fuel products can be purchased by motorists",
        "CLASS": "Petrol Station",
        "FID": 1,
        "NAME": "Cobram",
        "OPERATIONALSTATUS": "Operational",
        "OWNER": "BP",
        "INDUSTRYID": "",
        "ADDRESS": "3701 Murray Valley Highway",
        "SUBURB": "Cobram",
        "STATE": "Victoria",
        "SPATIALCONFIDENCE": 5,
        "REVISED": 20110725,
        "COMMENT": "",
        "LATITUDE": -35.9211754139999,
        "LONGITUDE": 145.638305815
    }

    let sql = 'INSERT INTO servos (name, owner, street_address, suburb, state, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7);'

    let params = [testServo["NAME"], testServo["OWNER"], testServo["ADDRESS"], testServo["SUBURB"], testServo["STATE"], testServo["LATITUDE"], testServo["LONGITUDE"]];

    pool.query(sql, params, (err, dbres) => {
        console.log(dbres)
        // res.json(dbres.rows)
    });

    res.send(process.env)
});




app.listen(8080, () => {
    console.log("server listening on port 8080")
});