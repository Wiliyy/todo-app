// src/components/TodoList.jsx (New - Separated List Logic)
import { useMemo } from 'react'
import TodoItem from './TodoItem'

function TodoList({ selectedTag, handleTaskCount, currentFilter, filteredTodos, filter, filters, setFilters, handleTypeChange , todos, onToggle, onDelete, onUpdate, editingId, setEditingId }) {
  const handleEdit = (id) => setEditingId(id)
  
  const handleSaveEdit = (id, newText) => {
    onUpdate(id, newText)
    setEditingId(null)
  }
  const handleCancelEdit = () => setEditingId(null)

  if (todos.length === 0) {
    return 
  }

  // New render logic: render all tags if the selectedTag/todo.tag match fails
  const renderTodos = () => {
    if (filter.selected && filter.id == currentFilter) {
      // If a selectedTag is present, render only todos for that tag; else, render all
      return filteredTodos.map((todo) => {
        if (!selectedTag) {
          // No selectedTag: show all todos
          return (
            <TodoItem
              selectedTag={selectedTag}
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              isEditing={editingId === todo.id}
            />
          );
        } else if (todo.tag === selectedTag.id ) {
          // selectedTag present and matches todo.tag
          return (
            <TodoItem
              selectedTag={selectedTag}
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              isEditing={editingId === todo.id}
            />
          );
        }
        // If selectedTag present, but not matching, don't render
        return null;
      });
    }
    return null;
  }

  return (
    <div className='todos-container'>
      <button className='filter-buttons-title-button' onClick={() => handleTypeChange(filter.id)}>
        {filter.label} TASKS{' '} 
        <span className='filter-buttons-button-count'>
        </span>
                {handleTaskCount(filter)}
        <span style={{ verticalAlign: 'middle' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {!filter.selected ? <polyline points="9 6 15 12 9 18" /> : <polyline points="6 9 12 15 18 9" />}
          </svg>
        </span>
      </button>
      {renderTodos()}
    </div>
  )
}

export default TodoList