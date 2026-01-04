import React from 'react'
import '../styles/FilterButtons.css'

function FilterButtons({ todos, currentFilter, onFilterChange }) {
    // Tip: Using an array makes it easy to add/remove filters
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'active', label: 'Active' },
        { id: 'completed', label: 'Completed' }
    ]

    const handleFilterClass = (filter) => {
        return `filter-buttons-button ${currentFilter === filter ? 'filter-buttons-button-active' : ''}`
    }

    const handleTaskCount = (filter) => {
        switch (filter.id) {
            case 'completed':
                return ` ${todos.filter(todo => todo.isCompleted).length}`
            case 'active':
                return ` ${todos.filter(todo => !todo.isCompleted).length}`
            case 'all':
                return ` ${todos.length}`
        }
    }


    return (
        <div className='filter-buttons-container'>
            <h1 className='filter-buttons-title'> CATEGORIES </h1>
            <div className='filter-buttons'>
                {/* Tip: .map() is cleaner and follows DRY principle */}
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={handleFilterClass(filter.id)}
                        onClick={() => onFilterChange(filter.id)}
                    >
                        {filter.label} 
                        
                            {handleTaskCount(filter) > 0 && 
                        <span className='filter-buttons-button-count'>
                            {handleTaskCount(filter)}
                            </span>
                             } 

                    </button>
                ))}
            </div>
        </div>
    )
}

export default FilterButtons