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
import { useTags } from '../hooks/useTags'


function HabitsView({ initialTags, theme, toggleTheme, initialTodos, error, setError, handleAppClick, isFormVisible, setIsFormVisible, input, setInput, filters, setFilters, editingId, setEditingId, isFormEditingVisible, setIsFormEditingVisible, viewMonth, setViewMonth, viewYear, setViewYear, selectedDay, setSelectedDay, themeIcons }) {
    const [completedTodos, setCompletedTodos] = useState(0)
    const [dayIndex, setDayIndex] = useState(0)
    const [selectedType, setSelectedType] = useState('Daily')

    const [selectedDays, setSelectedDays] = useState([])

    const { habits: todos, addHabit: addTodo, deleteHabit: deleteTodo, toggleHabit: toggleTodo, updateHabit: updateTodo  , updateHabitTag} = useHabits(initialTodos)
    const { filteredTodos, currentFilter, changeFilter, getCount } = useTodoFilter(todos, error, setError , viewMonth, viewYear, selectedDay )
    const { tags, addTag, updateTag, deleteTag, toggleTag, selectedTag } = useTags(initialTags)

    const [isCalendarVisible, setIsCalendarVisible] = useState(false)
    const [isRepeatTypeVisible, setIsRepeatTypeVisible] = useState(false)


    useEffect(() => {
        // console.log(new Date().getDay())
        // setCompletedTodos(todos.filter(todo => todo.isCompleted).length)
        console.log(todos)
    }, [todos])

    useEffect(() => {

        setDayIndex(new Date(viewYear, viewMonth, selectedDay).getDay())
    }, [selectedDay])
    const handleTypeChange = (id) => {
        changeFilter(id)
        setFilters(filters.map((filter) =>
            filter.id === id
                ? { ...filter, selected: !filter.selected }
                : { ...filter, selected: false }
        ))
    }

    const handleTagChange = (id) => {
        toggleTag(id)
    }

    const handleHabitSubmit = (e) => {
        let targetDate = new Date(viewYear, viewMonth, selectedDay)

        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        addTodo(input, selectedType, selectedTag ? selectedTag.label : '', targetDate , selectedDays)
        setInput('')
        setIsFormVisible(false)
    }

    const handleTaskCount = (filter) => {
        return getCount(todos, filter, selectedTag, viewMonth, viewYear, selectedDay , isFormEditingVisible)
    }

    useEffect(() => {
        handleTaskCount('all')
    }, [selectedDay])
    return (
        <div
            onClick={handleAppClick} className='app'>
            <Header
                themeIcons={themeIcons}
                completedTodos={completedTodos}
                totalTodos={todos.length}
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
                handleTaskCount={handleTaskCount}
                filteredTodos={filteredTodos}
            />
            
            {!isFormEditingVisible && <TagsButtons
                addTag={addTag}
                isCalendarVisible={isCalendarVisible}
                setIsCalendarVisible={setIsCalendarVisible}
                todos={todos}
                onDeleteTag={deleteTag}
                onUpdateTag={updateTag}
                handleTaskCount={handleTaskCount}
                tags={tags}
                error={error} setError={setError}
                updateTag={updateTag}
                input={input} setInput={setInput}
                getCount={getCount}
                completedTodos={completedTodos}
                currentFilter={currentFilter}
                onTagChange={handleTagChange}
                updateHabitTag={updateHabitTag}
                setSelectedDay={setSelectedDay}
                selectedTag={selectedTag}
                isFormVisible={isFormVisible}
                isFormEditingVisible={isFormEditingVisible}
                filteredTodos={filteredTodos}
                viewMonth={viewMonth}
                setViewMonth={setViewMonth}
                viewYear={viewYear}
                setViewYear={setViewYear}
                selectedDay={selectedDay}
                />}

            {!isFormEditingVisible && <TodoForm
                addTag={addTag}
                todos={todos}
                onDeleteTag={deleteTag}
                onUpdateTag={updateTag}
                handleTaskCount={handleTaskCount}
                tags={tags}
                error={error} setError={setError}
                updateTag={updateTag}
                input={input} setInput={setInput}
                getCount={getCount}
                completedTodos={completedTodos}
                currentFilter={currentFilter}
                onTagChange={handleTagChange}
                updateHabitTag={updateHabitTag}
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
                error={error}
                setError={setError}
                handleAppClick={handleAppClick}
                isFormVisible={isFormVisible}
                input={input}
                setInput={setInput}
                handleSubmit={handleHabitSubmit}
                selectedTag={selectedTag}
                isFormEditingVisible={isFormEditingVisible}
                isRepeatTypeVisible={isRepeatTypeVisible}
                setIsRepeatTypeVisible={setIsRepeatTypeVisible}
                dayIndex={dayIndex}
                setDayIndex={setDayIndex}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                />}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2cap"
                }}
                >
                {
                    <HabitList
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    isCalendarVisible={isCalendarVisible}
                    setSelectedDay={setSelectedDay}
                    setViewMonth={setViewMonth}
                    setViewYear={setViewYear}
                    setIsCalendarVisible={setIsCalendarVisible}
                    selectedTag={selectedTag}
                    handleTaskCount={handleTaskCount}
                    currentFilter={currentFilter}
                    filteredTodos={filteredTodos}
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
                    isFormVisible={isFormVisible}
                    setIsFormEditingVisible={setIsFormEditingVisible}
                    isRepeatTypeVisible={isRepeatTypeVisible}
                    setIsRepeatTypeVisible={setIsRepeatTypeVisible}
                    dayIndex={dayIndex}
                    setDayIndex={setDayIndex}
                    addTag={addTag}
                    onDeleteTag={deleteTag}
                    onUpdateTag={updateTag}
                    tags={tags}
                    error={error} setError={setError}
                    updateTag={updateTag}
                    input={input} setInput={setInput}
                    getCount={getCount}
                    completedTodos={completedTodos}
                    handleTagChange={handleTagChange}
                    updateHabitTag={updateHabitTag}
                    />
                }

            </div>
            {!isFormVisible && <button
                className="floating-button" onClick={() => {
                    setIsCalendarVisible(false)
                }}> + </button>
            }
        </div>
    )
}

export default HabitsView