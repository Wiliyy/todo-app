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

  const [input, setInput] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') {
      return
    }
    addTodo(input)
    setInput('')
    setIsFormVisible(false)
  }

  const handleFormVisible = (visible) => {
    console.log("handleFormVisible", visible)
    if (visible === 1) {
      console.log("visible true")
      setIsFormVisible(true)
    } else {
      console.log("visible false")
      setIsFormVisible(false)
    }
  }
  
  const handleAppClick = (e) => {
    console.log("handleAppClick")
    if (e.target === e.currentTarget) {
      handleFormVisible(false)
      console.log("handleAppClick true")
    } else {
      console.log("handleAppClick false")
    }
  }

  return (
    <div onClick={handleAppClick} className='app'>

      <TodoForm handleAppClick={handleAppClick} setIsFormVisible={setIsFormVisible} isFormVisible={isFormVisible} input={input} setInput={setInput} handleSubmit={handleSubmit} todos={todos} completedTodos={completedTodos} />
      <FilterButtons completedTodos={completedTodos} todos={todos} currentFilter={currentFilter} onFilterChange={changeFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      { !isFormVisible && <button className="floating-button" onClick={() => { handleFormVisible(1); }}> + </button> }
    </div>
  )
}

export default App