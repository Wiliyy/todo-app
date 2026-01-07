import React, { useState } from 'react'
import '../styles/TodoForm.css'

function TodoForm({handleAppClick , isFormVisible, input, setInput, handleSubmit }) {


const handleChange = (e) => {
    setInput(e.target.value)
}
  return (
    <form 
    style={{ display: isFormVisible ? 'flex' : 'none' }}
    className='todo-form-container' onSubmit={handleSubmit} onClick={(e) => {e.stopPropagation() , handleAppClick(e)}}>
      { isFormVisible && <div className='todo-form-container-inner' onClick={handleAppClick}>
          <div className="todo-form">
                <input
                  className="todo-form-input"
                  placeholder='write your next task'
                  type="text"
                  value={input}
                  onChange={handleChange}
                  onClick={(e) => {e.stopPropagation()}}
                  autoFocus
                  />
                <button className="todo-form-button" onClick={(e) => { e.stopPropagation(); handleSubmit(e); }}> + </button>
            </div>
        </div>
        }
    </form>
  )
}

export default TodoForm