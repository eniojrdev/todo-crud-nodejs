const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checkIfUserExists(request, response, next) {
  const { username } = request.headers

  const user = users.find(user => user.username === username);

  if(!user) {
    return response.status(400).send({error: "User does not exist"})
  }

  request.user = user;

  next();
}

function checkIfTodoExists(request, response, next) {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo) {
    return response.status(404).send({error: "Todo does not exist"})
  }

  request.todo = todo;
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
  const { user } = request

  return response.send(user.todos)
});

app.post('/todos', checkIfUserExists, (request, response) => {
  const { title, deadline } = request.body
  const { user } = request

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo)

  return response.status(201).send(todo)
});

app.put('/todos/:id', checkIfUserExists, checkIfTodoExists, (request, response) => {
  const { title, deadline } = request.body
  let { todo } = request;

  todo = {
    ...todo,
    title,
    deadline: new Date(deadline)
  }

  return response.json(todo)
});

app.patch('/todos/:id/done', checkIfUserExists, checkIfTodoExists, (request, response) => {
  const { todo } = request;

  todo.done = true;

  return response.json(todo);
});

app.delete('/todos/:id', checkIfUserExists, checkIfTodoExists, (request, response) => {
  const { user, todo } = request;

  user.todos.splice(todo, 1);

  return response.status(204).send();
});

module.exports = app;