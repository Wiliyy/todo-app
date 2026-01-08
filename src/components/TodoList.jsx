// src/components/TodoList.jsx (New - Separated List Logic)
import { useEffect, useMemo } from 'react'
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
    if (filter.selected ) {
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
              handleTypeChange={handleTypeChange}
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
                handleTypeChange={handleTypeChange}
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

      {renderTodos()}
    </div>
  )
}

export default TodoList