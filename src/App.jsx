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
import { useHabits } from './hooks/useHabits'
import HabitList from './components/HabitList'
import TasksView from './Views/TasksView'
import HabitsView from './Views/HabitsView'
import Header from './components/Header'


function App() {
  const [theme, setTheme] = useState('light')

  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isFormEditingVisible, setIsFormEditingVisible] = useState(false)
  const [initialTodos, setInitialTodos] = useState([])


  
  const [tags, setTags] = useState([
    { id: 'Quick', label: 'Quick', selected: true },
  ])

  const [filters, setFilters] = useState([
    { id: 'active', label: 'Active', selected: true },
    { id: 'completed', label: 'Completed', selected: false }
  ])


  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  const handleFormVisible = (visible) => {
    if (visible === 1) {
      setIsFormVisible(true)
      setInput('')
    } else {
      setIsFormVisible(false)
      setInput('')
    }
  }

  const handleAppClick = (e) => {
    if (e.target === e.currentTarget) {
      handleFormVisible(false)
    } 
  }

  const selectedTag = tags.find(tag => tag.selected)

  
  
  return (
    <div onClick={handleAppClick} className='app'>
    {/* <TasksView currentView={currentView} initialTodos={[]}  error={error} setError={setError} handleAppClick={handleAppClick} isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} input={input} setInput={setInput} filters={filters} setFilters={setFilters} editingId={editingId} setEditingId={setEditingId} /> */}
    <HabitsView 
    isFormEditingVisible={isFormEditingVisible}
    setIsFormEditingVisible={setIsFormEditingVisible}
    theme={theme}
    toggleTheme={toggleTheme}
    initialTodos={initialTodos || []}  error={error} setError={setError} handleAppClick={handleAppClick} isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} input={input} setInput={setInput} filters={filters} setFilters={setFilters} editingId={editingId} setEditingId={setEditingId} />
      {/* <TodoHero completedTodos={completedHabits} totalTodos={habits.length} />
      <FilterButtons handleTaskCount={handleTaskCount} filters={filters} setFilters={setFilters} error={error} setError={setError} updateTag={updateTag} isFormVisible={isFormVisible} input={input} setInput={setInput} getCount={getCount} completedTodos={completedTodos} todos={todos} currentFilter={currentFilter} onFilterChange={changeFilter} />
      <TagsButtons todos={habits} onDeleteTag={deleteTag} onUpdateTag={updateTag} selectedTag={selectedTag} handleTaskCount={handleTaskCount} tags={tags} setTags={setTags} error={error} setError={setError} updateTag={updateTag} isFormVisible={isFormVisible} input={input} setInput={setInput} getCount={getHabitCount} completedTodos={completedHabits} currentFilter={currentFilter} onTagChange={handleTagChange} />
      <TodoForm error={error} setError={setError} handleAppClick={handleAppClick} isFormVisible={isFormVisible} input={input} setInput={setInput} handleSubmit={handleSubmit}  />
    {
      filters.map((filter, index) => (
        (
          <div 
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2cap"
          }}
          key={index}
          >
      <button className='filter-buttons-title-button' onClick={() => handleTypeChange(filter.id)}>
        {filter.label} TASKS{' '} 
        
                {getHabitCount(habits, filter.id, selectedTag)}
        <span style={{ verticalAlign: 'middle' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {!filter.selected ? <polyline points="9 6 15 12 9 18" /> : <polyline points="6 9 12 15 18 9" />}
          </svg>
        </span>
      </button>
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
                <HabitList
          selectedTag={selectedTag}
          handleTaskCount={getHabitCount}
          currentFilter={currentFilter}
          filteredTodos={filteredHabits}
          filter={filter}
          handleTypeChange={handleTypeChange}
          todos={habits}
          onToggle={toggleHabit}
          onDelete={deleteHabit}

          onUpdate={updateTodo}
          editingId={editingId}
          setEditingId={setEditingId}
          />
          </div>
      ))
      )
    } */}

      {!isFormVisible && <button 
      className="floating-button" onClick={() => { handleFormVisible(1); }}>
        
         <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
           <line x1="11" y1="5" x2="11" y2="17" />
           <line x1="5" y1="11" x2="17" y2="11" />
         </svg>
         
         </button>}
    </div>
  )
}

export default App