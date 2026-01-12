import React, { useEffect, useRef, useState } from 'react'
import '../styles/FilterButtons.css'
import Calendar from './Calendar'
import CalenderCard from './CalenderCard'
import CalendarTable from './CalendarTable'

function TagsButtons({ todos, addTag, filteredTodos, selectedTag, tags, error, setError, isFormVisible, isFormEditingVisible, input, setInput, handleTaskCount , onTagChange, onUpdateTag, onDeleteTag, viewMonth, setViewMonth, viewYear, setViewYear, selectedDay, setSelectedDay, isCalendarVisible, setIsCalendarVisible, updateHabitTag, todoTag }) {
    const [editingTagId, setEditingTagId] = useState(null)
    const [editTagText, setEditTagText] = useState('')


    useEffect(() => {
        if (todoTag) {
            onTagChange(tags.find(t => t.label === todoTag)?.id)   
            // setEditingTagId(todoTag)
            // setEditTagText(todoTag)
        }
    }, [todoTag])
    // Add a new ref to track if long press happened
    const pressTimerRef = useRef(null)
    const isLongPressRef = useRef(false)  // ADD THIS
    const startPress = (tagId, tagLabel) => {
        isLongPressRef.current = false  // Reset on press start

        pressTimerRef.current = setTimeout(() => {
            isLongPressRef.current = true  // Mark as long press
            setEditingTagId(tagId)
            setEditTagText(tagLabel)
        }, 600)
    }

    const cancelPress = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current)
            pressTimerRef.current = null
        }
    }

    // Handle click - only toggle selection if NOT a long press
    const handleTagClick = (tagId) => {
        if (isLongPressRef.current) {
            isLongPressRef.current = false
            return  // Don't toggle if it was a long press
        }
        onTagChange(tagId)  // Toggle select/unselect
        handleCancelEdit()
    }

    const handleSaveTag = (tagId) => {
        if (editTagText.trim() && editTagText.trim() !== tags.find(t => t.id === tagId)?.label) {
            if (onUpdateTag) {
                onUpdateTag(tagId, editTagText.trim())
            }
        }
        setEditingTagId(null)
        setEditTagText('')
    }

    const handleCancelEdit = () => {
        setEditingTagId(null)
        setEditTagText('')
    }


    const handleFilterClass = (item) => {
        if (isFormEditingVisible) {
            return `filter-buttons-button ${item.selected ? 'filter-buttons-button-active' : ''}`
        }
        return `filter-buttons-button ${item.selected ? 'filter-buttons-button-active' : ''}`
    }

    const handleDeleteTag = (tag) => {
        if (selectedTag?.id === tag.id) {
            onTagChange(null)
        }
        // Count tasks that will be deleted
        const tasksWithTag = todos.filter(t => t.tag === tag.id)
        const confirmMessage = `Delete tag "${tag.label}" and ${tasksWithTag.length} task(s)?`
        if (!window.confirm(confirmMessage)) {
            return // User cancelled
        }



        // Delete all tasks with this tag
        if (onDeleteTag) {
            onDeleteTag(tag.id)
            updateHabitTag(tag.label, null)
        }

        // Remove from tags list
        // setTags(tags.filter(tag => tag.id !== tagId))

        // If deleted tag was selected, clear selection
        if (selectedTag?.id === tag.id) {
            onTagChange(null)
            updateHabitTag(tag.label, null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        if (tags.some(tag => tag.label === input)) {
            setError("Input is empty or already exists")
            return
        }
        addTag(input, true)
        // setTags([
        //     ...tags.map(tag => ({ ...tag, selected: false })),
        //     { id: input, label: input, selected: true }
        // ])
        setInput('')
    }

    const handleCalendarClick = () => {
        setIsCalendarVisible(!isCalendarVisible)
    }

    return (
        <form
            style={{ zIndex: isFormVisible ? -1 : 1 }}
            onSubmit={handleSubmit}
            className='filter-buttons-container'
        >

            {/* <Calendar /> */}
            {/* <CalenderCard w="10cap" h="10cap" /> */}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    // minHeight: '2cap',
                    // maxHeight: 'auto',
                }}
            >
                {/* {!isCalendarVisible && !isFormEditingVisible ? <h1

                    style={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    className='filter-buttons-title'>
                    CATEGORIES {`  `}

                    {selectedTag && `(${selectedTag.label})`}


                </h1> : null} */}
                {/* <Calendar /> */}
                {/* <CalendarTable /> */}
                {(isCalendarVisible && !isFormVisible && !isFormEditingVisible) ?

                    <Calendar
                        onClick={handleCalendarClick}
                        viewMonth={viewMonth}
                        setViewMonth={setViewMonth}
                        viewYear={viewYear}
                        setViewYear={setViewYear}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        filteredTodos={filteredTodos}
                        isFormEditingVisible={isFormEditingVisible}
                        isFormVisible={isFormVisible}
                    />
                    :null 
                    // !isFormEditingVisible &&
                    //     Array.from({length: 1}).map((_, index) => (
                    //         <div key={index} style={{
                    //         }}>
                    //         <CalenderCard
                    //             cardWidth="8cap"
                    //             cardHeight="8cap"
                    //             upperHieght="25%"
                    //             LeftWidth="6%"
                    //             RightWidth="6%"
                    //             dayFontSize="1cap"
                    //             dayNumberFontSize="1.5cap"
                    //             monthFontSize="1.5cap"
                    //             onClick={handleCalendarClick}
                    //             viewMonth={viewMonth}
                    //             setViewMonth={setViewMonth}
                    //             viewYear={viewYear}
                    //             setViewYear={setViewYear}
                    //             selectedDay={selectedDay + index}
                    //             setSelectedDay={setSelectedDay}
                    //             filteredTodos={filteredTodos}
        
                    //         />
                    //         </div>
                    //     ))
                }
            </div>


            <div className='filter-buttons'
            
            style={{
                backgroundColor:!isFormEditingVisible ? 'var(--primary-color)' : 'transparent',
            }}>
                {tags.map((tag, index) => {
                    const isEditing = editingTagId === tag.id
                    if (isEditing) {
                        return (
                            <div key={tag.id} className={handleFilterClass(tag)} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: 'var(--button-color)',
                                // color: 'var(--text-color-secondary)',
                                borderRadius: '9999px',
                                padding: '0 0.5cap',
                                fontSize: '11px',
                                width: '300px',
                                height: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 0.5cap',
                                margin: '0 0.5cap',
                                border: '1px solid var(--button-color)',
                                borderRadius: '9999px',
                            }}>
                                <input
                                    className="filter-buttons-button-label"

                                    value={editTagText}
                                    onChange={(e) => setEditTagText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveTag(tag.id)
                                        if (e.key === 'Escape') handleCancelEdit()
                                    }}
                                    autoFocus
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        flex: 1,
                                        color: 'var(--text-color-secondary)',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleSaveTag(tag.id)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    ✓
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    ✕
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteTag(tag)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    <span className='filter-buttons-button-count'>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        )
                    }

                    return (
                        <button
                            key={tag.id}
                            type="button"
                            className={handleFilterClass(tag)}
                            onClick={() => handleTagClick(tag.id)}  // Use new handler
                            onMouseDown={() => startPress(tag.id, tag.label)}
                            onMouseUp={cancelPress}
                            onMouseLeave={cancelPress}
                            onTouchStart={() => startPress(tag.id, tag.label)}
                            onTouchEnd={cancelPress}
                            onTouchCancel={cancelPress}
                            style={{
                                border: !isFormEditingVisible ? 'none' : '1px solid var(--text-color-secondary-hover)',
                                // backgroundColor: !isFormEditingVisible ?  'var(--primary-color)' : 'transparent',
                            }}
                            >
                            <span className='filter-buttons-button-label'>
                                {tag.label}
                            </span>
                            {(tag.selected && handleTaskCount("active") > 0) &&
                                <span className='filter-buttons-button-count'>
                                    {handleTaskCount("active")}
                                </span>
                            }
                        </button>
                    )
                })}
                {(tags.length === 0 || tags[tags.length - 1]?.id !== '') && !isFormVisible && (
                    <input
                    className={handleFilterClass({ id: '', selected: false })}
                    placeholder='+'
                    type='text'
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setError('') }}
                    onClick={(e) => { e.stopPropagation() }}
                    onBlur={() => { setError('') }}
                    style={{
                        border: !isFormEditingVisible ? 'none' : '1px solid var(--text-color-secondary-hover)',
                        // backgroundColor: !isFormEditingVisible ?  'var(--primary-color)' : 'transparent',
                    }}
                    />
                )}

            </div>
            {error && <p className='filter-buttons-error'>{error}</p>}
        </form>
    )
}

export default TagsButtons