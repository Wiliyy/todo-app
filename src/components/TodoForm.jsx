import React, { useState } from 'react'
import '../styles/TodoForm.css'

function TodoForm() {
    
const [input, setInput] = useState('')

const handleChange = (e) => {
    setInput(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault()
}

  return (
    <div>
        <h1 className="todo-form-title">Todo Form</h1>
        <div className="todo-form">
            <input className="todo-form-input" placeholder='write your next task' type="text" value={input} onChange={handleChange} />
            <button className="todo-form-button" onClick={handleSubmit}> + </button>
        </div>
    </div>
  )
}

export default TodoForm