import React, { useState } from 'react'
import '../styles/TodoForm.css'

function TodoForm({ todos, completedTodos, onAddTodo }) {

const [input, setInput] = useState('')

const handleChange = (e) => {
    setInput(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault()
    onAddTodo(input)
    setInput('')
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="todo-form-hero"
        >
          <div>
            <h1>
              {completedTodos != todos.length ? 'you can do it' : 'you did it'}
              </h1>
            <p>{completedTodos != todos.length ? 'keep it up' : 'good job'}</p>
          </div>
          <div>
            
            <div className="todo-form-hero-progress">
            {  
              (completedTodos != todos.length) 
              ? `${completedTodos} / ${todos.length}` 
              :
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 10 18 4 12" />
              </svg>
              }
            </div>
          </div>
          
        </div>
        <div className="todo-form">
            <input className="todo-form-input" placeholder='write your next task' type="text" value={input} onChange={handleChange} />
            <button className="todo-form-button" type="submit"> + </button>
        </div>
    </form>
  )
}

export default TodoForm