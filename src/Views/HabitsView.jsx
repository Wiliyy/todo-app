// src/App.jsx
import { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import { useTodoFilter } from '../hooks/useTodoFilter'
import TodoList from '../components/TodoList'
import TagsButtons from '../components/TagsButtons'
import TodoHero from '../components/TodoHero'
import { useHabits } from '../hooks/useHabits'
import HabitList from '../components/HabitList'
import Calendar from '../components/Calendar'
import CalenderCard from '../components/CalenderCard'
import Header from '../components/Header'


function HabitsView({ theme, toggleTheme, initialTodos, error, setError, handleAppClick, isFormVisible, setIsFormVisible, input, setInput, filters, setFilters, editingId, setEditingId, isFormEditingVisible, setIsFormEditingVisible }) {
    const [completedTodos, setCompletedTodos] = useState(0)

    const { habits: todos, addHabit: addTodo, deleteHabit: deleteTodo, toggleHabit: toggleTodo, updateHabit: updateTodo, updateTag: updateTag, deleteTag: deleteTag } = useHabits(initialTodos)
    const { filteredTodos, currentFilter, changeFilter, getCount } = useTodoFilter(todos, error, setError)

    const [isCalendarVisible, setIsCalendarVisible] = useState(false)

    const [viewMonth, setViewMonth] = useState(new Date().getMonth())    // 0-11
    const [viewYear, setViewYear] = useState(new Date().getFullYear())   // 2026
    const [selectedDay, setSelectedDay] = useState(new Date().getDate()) // 1-31
    const [selectedType, setSelectedType] = useState('Daily')



    useEffect(() => {
        setCompletedTodos(todos.filter(todo => todo.isCompleted).length)
        // console.log(todos)
    }, [todos])

    const [tags, setTags] = useState([
        { id: 'Quick', label: 'Quick', selected: true },
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
        let targetDate = new Date(viewYear, viewMonth, selectedDay)
        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        addTodo(input, selectedType, selectedTag ? selectedTag.id : 'All', targetDate)
        setInput('')
        setIsFormVisible(false)
    }


    const selectedTag = tags.find(tag => tag.selected)

    const handleTaskCount = (filter) => {
        return getCount(todos, filter, selectedTag)
    }

    useEffect(() => {
        console.log(viewYear, viewMonth, selectedDay)
        console.log(new Date(viewYear, viewMonth, selectedDay))

        
        // console.log(todos[0].targetDays)
    }, [todos])
    return (
        <div
            onClick={handleAppClick} className='app'>
            <Header 
            viewMonth={viewMonth}
            viewYear={viewYear}
            selectedDay={selectedDay}
            setViewMonth={setViewMonth}
            setViewYear={setViewYear}
            setSelectedDay={setSelectedDay}
                theme={theme}
                toggleTheme={toggleTheme}
                isCalendarVisible={isCalendarVisible}
                setIsCalendarVisible={setIsCalendarVisible}
            />
            {/* <TodoHero completedTodos={completedTodos} totalTodos={todos.length} /> */}
<div

style={{
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: '10px',
}}
>
    {   !isCalendarVisible &&      <CalenderCard 
        onClick={() => setIsCalendarVisible(!isCalendarVisible)}
        viewMonth={viewMonth}
        viewYear={viewYear}
        selectedDay={selectedDay}
        setViewMonth={setViewMonth}
        setViewYear={setViewYear}
        setSelectedDay={setSelectedDay}
        cardWidth="100%"
                cardHeight="50cap" 
                dayFontSize="15cap"
                monthFontSize="5cap" 
                upperHieght="20%" 
                LeftWidth="2cap" 
                RightWidth="2cap" 
        />}
        </div>
            {!isFormEditingVisible && <TagsButtons
            isCalendarVisible={isCalendarVisible}
            setIsCalendarVisible={setIsCalendarVisible}
            filteredTodos={filteredTodos}
            viewMonth={viewMonth}
            setViewMonth={setViewMonth}
            viewYear={viewYear}
            setViewYear={setViewYear}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            todos={todos} 
            onDeleteTag={deleteTag}
            onUpdateTag={updateTag}
            selectedTag={selectedTag}
            handleTaskCount={handleTaskCount}
            tags={tags} setTags={setTags}
            error={error} setError={setError}
            updateTag={updateTag}
            isFormVisible={isFormVisible}
            input={input} setInput={setInput}
            getCount={getCount}
            completedTodos={completedTodos}
            currentFilter={currentFilter}
            onTagChange={handleTagChange} />}
            
            {!isFormEditingVisible && <TodoForm
            filteredTodos={filteredTodos}
            viewMonth={viewMonth}
            setViewMonth={setViewMonth}
            viewYear={viewYear}
            setViewYear={setViewYear}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            isCalendarVisible={isCalendarVisible}
            setIsCalendarVisible={setIsCalendarVisible} 
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            error={error} setError={setError} handleAppClick={handleAppClick} isFormVisible={isFormVisible} input={input} setInput={setInput} handleSubmit={handleSubmit} />}
            {/* {
                filters.map((filter, index) => (
                    ( */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2cap"
                            }}
                            // key={index}
                        >
                            {/* <button className='filter-buttons-title-button' onClick={() => handleTypeChange(filter.id)}>
                                {filter.label} {' '}

                                {getCount(todos, filter.id, selectedTag)}
                                <span style={{ verticalAlign: 'middle' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        {!filter.selected ? <polyline points="9 6 15 12 9 18" /> : <polyline points="6 9 12 15 18 9" />}
                                    </svg>
                                </span>
                            </button> */}
                            {
                                
                                    <HabitList
                                        selectedType={selectedType}
                                        setSelectedType={setSelectedType}
                                        isCalendarVisible={isCalendarVisible}
                                        setSelectedDay={setSelectedDay}
                                        setViewMonth={setViewMonth}
                                        setViewYear={setViewYear}
                                        setIsCalendarVisible={setIsCalendarVisible}
                                        selectedTag={selectedTag}
                                        // key={index}
                                        handleTaskCount={handleTaskCount}
                                        currentFilter={currentFilter}
                                        filteredTodos={filteredTodos}
                                        // filter={filter}
                                        filters={filters}
                                        setFilters={setFilters}
                                        handleTypeChange={handleTypeChange}
                                        todos={todos}
                                        onToggle={toggleTodo}
                                        onDelete={deleteTodo}
                                        onUpdate={updateTodo}
                                        editingId={editingId}
                                        setEditingId={setEditingId}
                                        viewMonth={viewMonth}
                                        viewYear={viewYear}
                                        selectedDay={selectedDay}
                                        isFormEditingVisible={isFormEditingVisible}
                                        setIsFormEditingVisible={setIsFormEditingVisible}
                                    />
                            }
                            
                        </div>
            

            {!isFormVisible && <button
                className="floating-button" onClick={() => {
                    setIsCalendarVisible(false)
                    //  handleFormVisible(1);
                    // setIsFormEditingVisible(false)
                     }}> + </button>}
        </div>
    )
}

export default HabitsView