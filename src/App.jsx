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
    setInput('')
    if (input.trim() === '') {
      // return
    }else{  
      addTodo(input)
    }
  }

  const handleFormVisible = (visible) => {
   console.log("visible")
   if (visible == 1) {
    setIsFormVisible(true)
   }
   else {
    setIsFormVisible(false)
   }
  }

  const handleAppClick = (e) => {
    if (e.target === e.currentTarget) {
      handleFormVisible(false)
    }
  }

  return (
    <div onClick={handleAppClick} className='app'>

      <TodoForm setIsFormVisible={setIsFormVisible} isFormVisible={isFormVisible} input={input} setInput={setInput} handleSubmit={handleSubmit} todos={todos} completedTodos={completedTodos} />
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