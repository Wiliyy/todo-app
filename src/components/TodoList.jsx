// src/components/TodoList.jsx (New - Separated List Logic)
import { useMemo } from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete, onUpdate, editingId, setEditingId }) {
  const handleEdit = (id) => setEditingId(id)
  const handleSaveEdit = (id, newText) => {
    onUpdate(id, newText)
    setEditingId(null)
  }
  const handleCancelEdit = () => setEditingId(null)

  if (todos.length === 0) {
    return <p>No tasks to show</p>
  }

  return (
    <div className='todos-container'>
      <h1 className='filter-buttons-title'>TODAYS TASKS</h1>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={handleEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          isEditing={editingId === todo.id}
        />
      ))}
    </div>
  )
}

export default TodoList