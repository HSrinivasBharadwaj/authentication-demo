// const express = require('express');
// const router = require('./routes/user.routes');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const mysql = require('mysql2/promise');

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { router } from './routes/user.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/api", router);

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwertyuiop1@",
  database: "authentication"
});



await connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Successfully connected to MySQL Server");
  }
})



app.listen(3000, () => {
  console.log("Listening on port 3000");
});

export { connection }
