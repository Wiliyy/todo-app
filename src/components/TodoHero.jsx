import React from 'react'

function TodoHero({completedTodos, totalTodos}) {
  return (
    <div className="todo-form-hero">
          <div >
            <h1>
              {completedTodos != totalTodos ? 'you can do it' : 'you did it'}
              </h1>
            <p>{completedTodos != totalTodos ? 'keep it up' : 'good job !'}</p>
          </div>
          <div>
            <div className="todo-form-hero-progress">
            {  
              (completedTodos != totalTodos) 
              ? `${completedTodos} / ${totalTodos}` 
              :
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 10 18 4 12" />
              </svg>
              }
            </div>
          </div>
        </div>
  )
}

export default TodoHero