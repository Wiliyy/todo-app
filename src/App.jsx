// src/App.jsx
import { useEffect, useState } from 'react'
import './styles/App.css'
import HabitsView from './Views/HabitsView'


function App() {
  const [theme, setTheme] = useState('light')

  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isFormEditingVisible, setIsFormEditingVisible] = useState(false)
  const [initialTodos, setInitialTodos] = useState([])
  const [initialTags, setInitialTags] = useState([])
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())    // 0-11
  const [viewYear, setViewYear] = useState(new Date().getFullYear())   // 2026
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()) // 1-31
  const [filters, setFilters] = useState([
    { id: 'active', label: 'Active', selected: true },
    { id: 'completed', label: 'Completed', selected: false }
  ])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const themes = ['light', 'dark', 'ocean', 'forest', 'sunset'];

  const themeIcons = {
    light: '☀️',
    dark: '🌙',
    ocean: '🌊',
    forest: '🌲',
    sunset: '🌅'
  };
const toggleTheme = () => {
  setTheme(prev => {
    const currentIndex = themes.indexOf(prev);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  });
};

  const handleFormVisible = (visible) => {
    if (visible === 1) {
      setSelectedDay(new Date().getDate())
      setViewMonth(new Date().getMonth())
      setViewYear(new Date().getFullYear())
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


  return (
    <div onClick={handleAppClick} className='app'>
      <HabitsView
        initialTags={initialTags}
        setInitialTags={setInitialTags}
        isFormEditingVisible={isFormEditingVisible}
        setIsFormEditingVisible={setIsFormEditingVisible}
        theme={theme}
        toggleTheme={toggleTheme}
        initialTodos={initialTodos || []}
        error={error}
        setError={setError}
        handleAppClick={handleAppClick}
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        input={input} setInput={setInput}
        filters={filters}
        setFilters={setFilters} 
        editingId={editingId} 
        setEditingId={setEditingId}
        viewMonth={viewMonth}
        setViewMonth={setViewMonth}
        viewYear={viewYear}
        setViewYear={setViewYear}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        themeIcons={themeIcons}
         />

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