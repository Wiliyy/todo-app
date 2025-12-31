import React, { useState } from 'react'
import '../styles/TodoForm.css'

function TodoForm() {
const [todo, setTodo] = useState([])
const [input, setInput] = useState('')

const handleChange = (e) => {
    setInput(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault()
    setTodo(input)
}

  return (
    <div>
        <h1>Todo Form</h1>
        <p>{...todo}</p>
        <div className="todo-form">
            <input placeholder='write your next task' type="text" value={input} onChange={handleChange} />
            <button onClick={handleSubmit}> + </button>
        </div>
    </div>
  )
}

export default TodoForm