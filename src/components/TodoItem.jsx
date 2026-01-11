// src/components/TodoItem.jsx
import '../styles/TodoItem.css'
import { useState } from 'react'

function TodoItem({ selectedTag, todo, onToggle, onDelete, onEdit, isEditing, onSaveEdit, onCancelEdit, handleTypeChange }) {
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

    let pressTimer = null

    const startPress = (id) => {
      pressTimer = setTimeout(() => onEdit(id), 600)
    }
  
    const cancelPress = () => {
      if (pressTimer) clearTimeout(pressTimer)
    }

    return (
        <div className="todo-item">
            <div
                className="todo-item-container"
                onClick={() => {

                    // if (!todo.isCompleted) {
                    //     handleTypeChange("completed")
                    // }
                    // else {
                    // }
                        // handleTypeChange("active")
                    onToggle(todo.id, todo.text, todo.isCompleted)
                }}
                onMouseDown={() => startPress(todo.id)}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={() => startPress(todo.id)}
                onTouchEnd={cancelPress}
                onTouchCancel={cancelPress}
            >
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

                {/* {todo.frequency && <div className="todo-item-frequency-container">
                    <p className="todo-item-frequency">{todo.frequency}</p>
                </div>}

                {todo.targetDays && <div className="todo-item-target-days-container">
                    <p className="todo-item-target-days">{todo.targetDays}</p>
                </div>}

                {todo.customInterval && <div className="todo-item-custom-interval-container">
                    <p className="todo-item-custom-interval">{todo.customInterval}</p>
                </div>} */}

               <div className="todo-item-streak-container"
               style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                gap: '1cap',
                width: '10cap',
                // gap: '1cap',
                // backgroundColor: 'var(--button-color)',
                // color: 'var(--text-color)',
                // borderRadius: '9999px',
                // fontSize: '11px',
                // padding: '0 0.5cap',
               }}
               >
                {todo.streak > 0 && <div className="todo-item-streak">
                    <span className="habit-streak">  {todo.streak} 🔥 </span>
                </div>
                }
                </div>


                {todo.longestStreak && <div className="todo-item-longest-streak-container">
                    <p className="todo-item-longest-streak">{todo.longestStreak}</p>
                </div>}


                <button className="todo-item-button" onClick={() => onDelete(todo.id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2">
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