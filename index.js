require("dotenv").config();
const express = require('express')
const server = express()
const cors = require('cors')
const routers = require('./src/routers')
const morgan = require('morgan')
const logger = morgan('combined') 


const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server is running port ${port}`);
})

const corsOptions = {
    origin: '*',
  }

  
server.use('/public', express.static("public"))
server.use(cors(corsOptions))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(logger)
server.use("/api", routers)
module.exports = server