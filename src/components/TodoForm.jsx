import React, { useState } from 'react'
import '../styles/TodoForm.css'

function TodoForm({setIsFormVisible , isFormVisible, input, setInput, handleSubmit, todos, completedTodos }) {


const handleChange = (e) => {
    setInput(e.target.value)
}


  return (
    <form className='todo-form-container' onSubmit={handleSubmit}>
      <div className="todo-form-hero"
        >
          <div>
            <h1>
              {completedTodos != todos.length ? 'you can do it' : 'you did it'}
              </h1>
            <p>{completedTodos != todos.length ? 'keep it up' : 'good job !'}</p>
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
      { isFormVisible && <div className="todo-form" onClick={(e) => e.stopPropagation()}>
            <input
              className="todo-form-input"
              placeholder='write your next task'
              type="text"
              value={input}
              onChange={handleChange}
              onBlur={() => setIsFormVisible(false)}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="todo-form-button" onClick={(e) => { e.stopPropagation(); handleSubmit(e); }}> + </button>
        </div>}
        
    </form>
  )
}

export default TodoForm