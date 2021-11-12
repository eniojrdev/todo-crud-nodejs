const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checkIfUserExists(request, response, next) {
  const { username } = request.header

  const user = users.find(user => user.username === username);

  if(!user) {
    return response.status(400).send({error: "User does not exists"})
  }

  request.user = user;

  next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body

  const userExists = users.some(user => user.username === username)

  if(userExists) {
    return response.status(400).send({error: "User already exists"})
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user)

  return response.status(201).send(user)
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