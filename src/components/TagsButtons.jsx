import React, { useEffect, useState } from 'react'
import '../styles/FilterButtons.css'

function TagsButtons({ selectedTag, tags, setTags, error, setError, isFormVisible, input, setInput, handleTaskCount , currentTag, onTagChange }) {

    const handleFilterClass = (item) => {
        return `filter-buttons-button ${item.selected ? 'filter-buttons-button-active' : ''}`
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        if (tags.some(tag => tag.id === input)) {
            setError("Input is empty or already exists")
            return
        }
        setTags([
            ...tags.map(tag => ({ ...tag, selected: false })),
            { id: input, label: input, selected: true }
        ])
        setInput('')
    }

    
    return (
        <form
            style={{ zIndex: isFormVisible ? -1 : 1 }}
            onSubmit={handleSubmit} className='filter-buttons-container'>
            <h1 className='filter-buttons-title'> CATEGORIES {selectedTag ? `(${selectedTag.label})` : ''}</h1>
            <div className='filter-buttons'>
                {/* Tip: .map() is cleaner and follows DRY principle */}
                {tags.map((tag, index) => (
                    <>
                        <button
                            className={handleFilterClass(tag)}
                            onClick={() => { onTagChange(tag.id) }}>
                            <span className='filter-buttons-button-label'>
                                {tag.label}

                            </span>
                            {
                                (tag.id == currentTag) &&
                                <span className='filter-buttons-button-count'>
                                    {handleTaskCount(tag)}
                                </span>
                            }
                        </button>
                        {(index === tags.length - 1) && !isFormVisible && (
                            <input
                                className={handleFilterClass(tag.id === '' ? 'filter-buttons-button-active' : '')}
                                placeholder='+'
                                type='text'
                                value={input}
                                onChange={(e) => { setInput(e.target.value); setError('') }}
                                onClick={(e) => { e.stopPropagation() }}
                                onBlur={() => { setError('') }}
                            />
                        )}
                    </>
                ))}
            </div>
            {error && <p className='filter-buttons-error'>{error}</p>}
        </form>
    )
}

export default TagsButtons