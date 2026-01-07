// src/components/TodoItem.jsx
import '../styles/TodoItem.css'
import { useState } from 'react'

function TodoItem({ selectedTag, todo, onToggle, onDelete, onEdit, isEditing, onSaveEdit, onCancelEdit }) {
    if (!todo) return null

    const [editText, setEditText] = useState(todo.text)

    const handleSave = () => {
        if (editText.trim()) {
            onSaveEdit(todo.id, editText.trim())
        }
    }

    if (isEditing) {
        return (
            <div className="todo-item">
                <div className="todo-item-container">
                    <input
                        className="todo-form-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave()
                            if (e.key === 'Escape') onCancelEdit()
                        }}
                        autoFocus
                    />
                    <button className="todo-item-button" onClick={handleSave}>Save</button>
                    <button className="todo-item-button" onClick={onCancelEdit}>Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div className="todo-item">
            <div 
            onClick={() => onToggle(todo.id, todo.text, todo.isCompleted)} className="todo-item-container">
                <button
                    className={`${todo.isCompleted ? 'todo-item-checkbox-button-checked' : 'todo-item-checkbox-button'}`}
                >
                {todo.isCompleted &&
                   <div className="todo-item-checkbox-button-checked-icon">
                   <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 10 18 4 12" />
                    </svg>
                    </div>
                }
                </button>
                <p
                    style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                    className="todo-item-text"
                >
                    {todo.text} 
                </p>
                {!selectedTag && <div className="todo-item-tag-container">
                    <p className="todo-item-tag">{todo.tag}</p>
                </div>}
                <button className="todo-item-button" onClick={() => onEdit(todo.id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button className="todo-item-button" onClick={() => onDelete(todo.id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TodoItem