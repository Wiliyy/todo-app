// src/hooks/useTodoFilter.js
import { useState, useMemo, useCallback } from 'react'
import { TodoFilterService } from '../services/TodoFilterService.js'

export function useTodoFilter(todos, error, setError) {
    const [currentFilter, setCurrentFilter] = useState('all')
    const [filterService] = useState(() => new TodoFilterService())

    const filteredTodos = useMemo(() => {
        return filterService.filter(todos, currentFilter)
    }, [todos, currentFilter, filterService])

    const changeFilter = useCallback((filter) => {
        console.log("changeFilter", filter)
        setError("")
        setCurrentFilter(filter)
    }, [])

    const getCount = useCallback((todos, filterType, selectedTag) => {
        return filterService.getCount(todos, filterType, selectedTag)
    }, [filterService])

    return {
        filteredTodos,
        currentFilter,
        changeFilter,
        getCount
    }
}