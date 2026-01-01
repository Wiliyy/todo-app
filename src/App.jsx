import { useState } from 'react'
import './styles/App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import FilterButtons from './components/FilterButtons'

function App() {

  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', isCompleted: false },
    { id: 2, text: 'Finish project', isCompleted: false },
    { id: 3, text: 'Call mom', isCompleted: false },
  ])

  const [currentFilter, setCurrentFilter] = useState('all')

  // Tip: Cleaner filter logic using object lookup
  const filterMap = {
    all: () => true,
    active: (todo) => !todo.isCompleted,
    completed: (todo) => todo.isCompleted
  }

  const filteredTodos = todos.filter(filterMap[currentFilter] || filterMap['all'])

  const onFilterChange = (filter) => {
    setCurrentFilter(filter)
  }

  const handleToggle = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
  }

  const handleAddTodo = (text) => {
    setTodos([...todos, { id: todos.length + 1, text: text, isCompleted: false }])
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }


  return (
    <div className='app'>
      <TodoForm onAddTodo={handleAddTodo} />
      <FilterButtons  currentFilter={currentFilter} onFilterChange={onFilterChange} />
      <div className='todos-container'>
        <h1 className='filter-buttons-title'> TODAYS TASKS </h1>
        {filteredTodos.length > 0 && filteredTodos.map((todo) => (
          <TodoItem onDeleteTodo={handleDeleteTodo} key={todo.id} todo={todo} onToggle={handleToggle} />
        ))}
        {filteredTodos.length === 0 && <p>No {currentFilter} tasks to show</p>}
      </div>
    </div>
  )
}

export default App