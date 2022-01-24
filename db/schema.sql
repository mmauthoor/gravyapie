
-- <!-- What kinds of data will we store -->
-- <!-- what form of data (e.g. integer, etc) -->

CREATE DATABASE gravyapie;

CREATE TABLE servos (
    id SERIAL PRIMARY KEY,
    name TEXT,
    owner TEXT,
    street_address TEXT,
    suburb TEXT,
    state TEXT,
    postcode INTEGER,
    latitude FLOAT,
    longitude FLOAT    
);
