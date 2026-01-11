// src/App.jsx
import { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import { useTodoFilter } from '../hooks/useTodoFilter'
import TodoList from '../components/TodoList'
import TagsButtons from '../components/TagsButtons'
import TodoHero from '../components/TodoHero'
import { useHabits } from '../hooks/useHabits'
import HabitList from '../components/HabitList'


function HabitsView({ initialTodos, error, setError, handleAppClick, isFormVisible, setIsFormVisible, input, setInput, filters, setFilters, editingId, setEditingId }) {
    const [completedTodos, setCompletedTodos] = useState(0)

    const { habits: todos, addHabit: addTodo, deleteHabit: deleteTodo, toggleHabit: toggleTodo, updateHabit: updateTodo, updateTag: updateTag, deleteTag: deleteTag } = useHabits(initialTodos)
    const { filteredTodos, currentFilter, changeFilter, getCount } = useTodoFilter(todos, error, setError)




    useEffect(() => {
        setCompletedTodos(todos.filter(todo => todo.isCompleted).length)
        console.log("completedTodos", completedTodos)
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
        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        addTodo(input, "Daily", selectedTag ? selectedTag.id : 'Quick')
        setInput('')
        setIsFormVisible(false)
    }


    const selectedTag = tags.find(tag => tag.selected)

    const handleTaskCount = (filter) => {
        return getCount(todos, filter, selectedTag)
    }

    console.log("todos", todos)
    return (
        <div
            onClick={handleAppClick} className='app'>
            <TodoHero completedTodos={completedTodos} totalTodos={todos.length} />
            <TagsButtons todos={todos} onDeleteTag={deleteTag} onUpdateTag={updateTag} selectedTag={selectedTag} handleTaskCount={handleTaskCount} tags={tags} setTags={setTags} error={error} setError={setError} updateTag={updateTag} isFormVisible={isFormVisible} input={input} setInput={setInput} getCount={getCount} completedTodos={completedTodos} currentFilter={currentFilter} onTagChange={handleTagChange} />
            <TodoForm error={error} setError={setError} handleAppClick={handleAppClick} isFormVisible={isFormVisible} input={input} setInput={setInput} handleSubmit={handleSubmit} />
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
                                {filter.label} {' '}

                                {getCount(todos, filter.id, selectedTag)}
                                <span style={{ verticalAlign: 'middle' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        {!filter.selected ? <polyline points="9 6 15 12 9 18" /> : <polyline points="6 9 12 15 18 9" />}
                                    </svg>
                                </span>
                            </button>
                            <HabitList
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
                        </div>
                    ))
                )
            }

            {!isFormVisible && <button
                className="floating-button" onClick={() => { handleFormVisible(1); }}> + </button>}
        </div>
    )
}

export default HabitsView