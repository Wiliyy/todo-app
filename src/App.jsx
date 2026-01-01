import { useState } from 'react'
import './styles/App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries' , isCompleted: false },
    { id: 2, text: 'Finish project' , isCompleted: false },
    { id: 3, text: 'Call mom' , isCompleted: false },
  ])

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
    <>
      <TodoForm onAddTodo={handleAddTodo} />
      {todos.length > 0 && todos.map((todo) => (
        <TodoItem onDeleteTodo={handleDeleteTodo} key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
      {todos.length === 0 && <p>No todos to show</p>}
    </>
  )
}

export default App