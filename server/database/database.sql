CREATE TABLE users(
    fnm varchar(10) not null,
    lnm varchar(10) not null,
    email varchar(30) not null,
    phone varchar(10) not null,
    comment varchar(200) not null,
    primary key(email)
);