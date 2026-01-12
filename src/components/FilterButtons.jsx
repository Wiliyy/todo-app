import React, { useEffect, useState } from 'react'
import '../styles/FilterButtons.css'

function FilterButtons({ filters, setFilters, error, setError, isFormVisible, input, setInput, handleTaskCount , currentFilter, onFilterChange }) {

    const handleFilterClass = (filter) => {
        return `filter-buttons-button ${filter.selected === filter ? 'filter-buttons-button-active' : ''}`
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() === '') {
            return
        }
        if (filters.some(filter => filter.id === input)) {
            setError("Input is empty or already exists")
            return
        }
        setFilters([
            ...filters.map(filter => ({ ...filter, selected: false })),
            { id: input, label: input, selected: true }
        ])
        setInput('')
    }

    return (
        <form
            style={{ zIndex: isFormVisible ? -1 : 1 }}
            onSubmit={handleSubmit} className='filter-buttons-container'>
            <h1 className='filter-buttons-title'> CATEGORIES </h1>
            <div className='filter-buttons'>
                {/* Tip: .map() is cleaner and follows DRY principle */}
                {filters.map((filter, index) => (
                    <>
                        <button
                            className={handleFilterClass(filter.id)}
                            onClick={() => { onFilterChange(filter.id) }}>
                            <span className='filter-buttons-button-label'>
                                {filter.label}

                            </span>
                            {
                                (filter.id == currentFilter) &&
                                <span className='filter-buttons-button-count'>
                                    {handleTaskCount(filter)}
                                </span>
                            }
                        </button>
                        {(index === filters.length - 1) && !isFormVisible && (
                            <input
                                className={handleFilterClass(filter.id === '' ? 'filter-buttons-button-active' : '')}
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
            {<p className='filter-buttons-error'>{error}</p>}
        </form>
    )
}

export default FilterButtons