// src/App.jsx
import { useEffect, useState } from 'react'
import './styles/App.css'
import TodoForm from './components/TodoForm'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import { useTodoFilter } from './hooks/useTodoFilter'
import TodoHero from './components/TodoHero'
import TagsButtons from './components/TagsButtons'


function App() {
  const initialTodos = []

  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [completedTodos, setCompletedTodos] = useState(0)

  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, updateTag } = useTodos(initialTodos)
  const { filteredTodos, currentFilter, changeFilter, getCount } = useTodoFilter(todos, error, setError)
  const [editingId, setEditingId] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    setCompletedTodos(todos.filter(todo => todo.isCompleted).length)
  }, [todos])

  const [tags, setTags] = useState([
    { id: 'Quick', label: 'Quick', selected: true },
  ])

  const [filters, setFilters] = useState([
    // { id: 'all', label: 'All', selected: true },
    { id: 'active', label: 'Active', selected: false },
    { id: 'completed', label: 'Completed', selected: false }
  ])

  const handleTypeChange = (id) => {
    changeFilter(id)
    setFilters(filters.map((filter) =>
      filter.id === id
        ? { ...filter, selected: !filter.selected }
        : { ...filter, selected: false }
    ))
  }

  const handleTagChange = (id) => {
    setTags(tags.map((tag) =>
      tag.id === id
        ? { ...tag, selected: !tag.selected }
        : { ...tag, selected: false }
    ))
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') {
      return
    }
    // updateTag(currentFilter)
    addTodo(input, selectedTag ? selectedTag.id : 'Quick')
    setInput('')
    setIsFormVisible(false)
  }

  const handleFormVisible = (visible) => {
    // console.log("handleFormVisible", visible)
    if (visible === 1) {
      // console.log("visible true")
      setIsFormVisible(true)
      setInput('')
    } else {
      // console.log("visible false")
      setIsFormVisible(false)
      setInput('')
    }
  }

  const handleAppClick = (e) => {
    // console.log("handleAppClick")
    if (e.target === e.currentTarget) {
      handleFormVisible(false)
      // console.log("handleAppClick true")
    } else {
      // console.log("handleAppClick false")
    }
  }

  const selectedTag = tags.find(tag => tag.selected)

  const handleTaskCount = (filter) => {
    return getCount(todos, filter.id , selectedTag)
}



  return (
    <div onClick={handleAppClick} className='app'>
      <TodoHero completedTodos={completedTodos} totalTodos={todos.length} />
      {/* <FilterButtons handleTaskCount={handleTaskCount} filters={filters} setFilters={setFilters} error={error} setError={setError} updateTag={updateTag} isFormVisible={isFormVisible} input={input} setInput={setInput} getCount={getCount} completedTodos={completedTodos} todos={todos} currentFilter={currentFilter} onFilterChange={changeFilter} /> */}
      <TagsButtons selectedTag={selectedTag} handleTaskCount={handleTaskCount} tags={tags} setTags={setTags} error={error} setError={setError} updateTag={updateTag} isFormVisible={isFormVisible} input={input} setInput={setInput} getCount={getCount} completedTodos={completedTodos} todos={todos} currentFilter={currentFilter} onTagChange={handleTagChange} />
      <TodoForm error={error} setError={setError} handleAppClick={handleAppClick} isFormVisible={isFormVisible} input={input} setInput={setInput} handleSubmit={handleSubmit}  />

    {
      filters.map((filter, index) => (
        (
        <TodoList
          selectedTag={selectedTag}
          key={index}
          handleTaskCount={handleTaskCount}
          currentFilter={currentFilter}
          filteredTodos={filteredTodos}
          filter={filter}
          filters={filters}
          setFilters={setFilters}
          handleTypeChange={handleTypeChange}
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      ))
      )
    }

      {!isFormVisible && <button className="floating-button" onClick={() => { handleFormVisible(1); }}> + </button>}
    </div>
  )
}

export default App