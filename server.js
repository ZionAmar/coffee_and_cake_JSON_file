
const express = require('express');
const fs = require('fs');
const path = require('path');
const {query} = require("express");

const app = express();
const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname))); // כדי לספק את קבצי ה-HTML, CSS ו-JavaScript לדפדפן

app.listen( port,() => {
  console.log(`Server is listening on url ${port} `);
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname) });
});

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'data.json'));
});

app.post('/add', (req, res) => {
  const name = req.body.name;
  const choice = req.body.choice;
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const rowData = { name: name, choice: choice, date: date, time: time };
  const rowsData = JSON.parse(fs.readFileSync('data.json', 'utf8')) || [];
  rowsData.push(rowData);
  console.log(rowsData);
  fs.writeFileSync('data.json', JSON.stringify(rowsData));
  res.status(200).json({message: "OK"});
});