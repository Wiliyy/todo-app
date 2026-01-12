// src/hooks/useTodoFilter.js
import { useState, useMemo, useCallback } from 'react'
import { TodoFilterService } from '../services/TodoFilterService.js'

export function useTodoFilter(todos, error, setError , viewMonth, viewYear, selectedDay) {
    const [currentFilter, setCurrentFilter] = useState('all')
    const [filterService] = useState(() => new TodoFilterService())

    const filteredTodos = useMemo(() => {
        return filterService.filter(todos, currentFilter)
    }, [todos, currentFilter, filterService])

    const changeFilter = useCallback((filter) => {
        setError("")
        setCurrentFilter(filter)
    }, [])

    const getCount = useCallback((todos, filterType, selectedTag, viewMonth, viewYear, selectedDay) => {
        // console.log('getCount', todos, filterType, selectedTag)
        // console.log('filterService', filterService)
        // console.log('currentFilter', currentFilter)
        // console.log('selectedTag', selectedTag)
        // console.log('filterService.getCount', filterService.getCount(todos, filterType, selectedTag))
        return filterService.getCount(todos, filterType, selectedTag, viewMonth, viewYear, selectedDay)
    }, [filterService, viewMonth, viewYear, selectedDay])

    return {
        filteredTodos,
        currentFilter,
        changeFilter,
        getCount
    }
}