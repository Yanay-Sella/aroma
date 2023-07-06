CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fnm varchar(10) not null,
    lnm varchar(10) not null,
    email varchar(30) UNIQUE,
    phone varchar(10) UNIQUE,
    comment varchar(200) not null
);