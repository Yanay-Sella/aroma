-- need to create the table in the following order

CREATE TABLE countries(
    cName varchar(10) PRIMARY KEY
);


CREATE TABLE branches(
    bName varchar(10) PRIMARY KEY,
    country varchar(10) REFERENCES countries(cName)
);

CREATE TABLE foods(
    fName varchar(10) PRIMARY KEY
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fnm varchar(10) not null,
    lnm varchar(10) not null,
    email varchar(30) UNIQUE,
    phone varchar(10) UNIQUE,
    comment varchar(200) not null,
    branch varchar(10) REFERENCES branches(bName)
);

CREATE TABLE loves(
    food varchar(10) REFERENCES foods(fName),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (food, userId)
);