import React from 'react'
import Calendar from './Calendar'
import CalenderCard from './CalenderCard'

function TodoHero({completedTodos, totalTodos}) {
  return (
    <div 
    style={{
      border: '1px solid var(--text-color-secondary)',
    }}
    className="todo-form-hero"
    >
          <div className="todo-form-hero-text">
            <h1
            
            >
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
              <svg
               style={{
                color: completedTodos != totalTodos ? 'var(--text-color)' : 'var(--secondary-color)',
               }}
               width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 10 18 4 12" />
              </svg>
              }
            </div>
          </div>

          {/* <Calendar /> */}
          {/* <CalenderCard cardWidth="10cap" cardHeight="20cap" /> */}
        </div>
  )
}

export default TodoHero