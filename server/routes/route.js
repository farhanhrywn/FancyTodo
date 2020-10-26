const route = require('express').Router()
const Controller = require('../controllers/controllers.js')


route.post('/', Controller.addToDo)
route.get('/', Controller.showListTodos)
route.get('/:id', Controller.showTodoById)
route.put('/:id', Controller.updateTodoById)
route.patch('/:id', Controller.updateStatusById)
route.delete('/:id', Controller.deleteTodo)
module.exports = route