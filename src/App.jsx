// src/App.jsx
import { useEffect, useState } from 'react'
import './styles/App.css'
import TodoForm from './components/TodoForm'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import { useTodoFilter } from './hooks/useTodoFilter'


function App() {
  const initialTodos = []

  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodos(initialTodos)
  const { filteredTodos, currentFilter, changeFilter } = useTodoFilter(todos)
  const [editingId, setEditingId] = useState(null)
  const [completedTodos, setCompletedTodos] = useState(0)

  useEffect(() => {
    setCompletedTodos(todos.filter(todo => todo.isCompleted).length)
  }, [todos])


  
  return (
    <div className='app'>
      <TodoForm  todos={todos} completedTodos={completedTodos} onAddTodo={addTodo} />
      <FilterButtons todos={todos} currentFilter={currentFilter} onFilterChange={changeFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        editingId={editingId}
        setEditingId={setEditingId}
      />
    </div>
  )
}

export default App