require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.UNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "mysql",
    "dialectOptions": {
            host: process.env.HOST,
            user: process.env.UNAME,
            password: process.env.PASS,
            database: process.env.DB,
            connectTimeout: 20000
      },
},
"test": {
    "username": process.env.UNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "mysql",
    "dialectOptions": {
        host: process.env.HOST,
        user: process.env.UNAME,
        password: process.env.PASS,
        database: process.env.DB,
        connectTimeout: 20000
  },
},
"production": {
    "username": process.env.UNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "mysql",
    "dialectOptions": {
        host: process.env.HOST,
        user: process.env.UNAME,
        password: process.env.PASS,
        database: process.env.DB,
        connectTimeout: 20000
  },
}
};