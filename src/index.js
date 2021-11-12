const express = require('express');
const cors = require('cors');

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

// const users = [];

function checkIfUserExists(request, response, next) {
  // Complete aqui
}

app.post('/users', (request, response) => {
  // Complete aqui
});

app.get('/todos', checkIfUserExists, (request, response) => {
  // Complete aqui
});

app.post('/todos', checkIfUserExists, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checkIfUserExists, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checkIfUserExists, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checkIfUserExists, (request, response) => {
  // Complete aqui
});

module.exports = app;