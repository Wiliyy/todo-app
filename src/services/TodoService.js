// src/services/TodoService.js
import { Todo } from '../models/Todo.js'

export class TodoService {
  constructor() {
    this.todos = []
  }

  // Single Responsibility: Only handles todo CRUD operations
  addTodo(text, tag) {
    const id = this.generateId()
    const todo = new Todo(id, text, tag, false)
      this.todos.push(todo)
      return todo
    }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  // src/services/TodoService.js
  deleteTag(tagToDelete, defaultTag = "Quick task") {
        // Update all todos with this tag to default tag
    //     this.todos.forEach(todo => {
    //     if (todo.tag === tagToDelete) {
    //         todo.updateTag(defaultTag)
    //     }
    // })
            // Delete all todos with this tag
        this.todos = this.todos.filter(todo => todo.tag !== tagToDelete)
   }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.toggle()
      return todo
    }
    return null
  }

  updateTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.updateText(newText)
      return todo
    }
    return null
  }

  updateTag(id, newTag) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.updateTag(newTag)
      return todo
    }
    return null
  }

  getAllTodos() {
    return this.todos.map(t => t.toPlainObject())
  }

  generateId() {
    return Date.now() + Math.random()
  }
}