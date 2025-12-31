import React, { useState } from 'react'
import '../styles/TodoItem.css'

function TodoItem({ todo, onToggle }) {

    if (!todo) return null
    return (
        <div className="todo-item">
            <div className="todo-item-container">
                <button
                    className={`${todo.isCompleted ? 'todo-item-checkbox-button-checked' : 'todo-item-checkbox-button'}`} onClick={() => onToggle(todo.id)}></button>
                <p
                    style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                    className="todo-item-text">{todo.text}</p>
                <button className="todo-item-button" onClick={() => onToggle(todo.id)}>edit</button>
                <button className="todo-item-button" onClick={() => onToggle(todo.id)}>delete</button>
            </div>
        </div>
    )
}

export default TodoItem