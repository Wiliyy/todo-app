// src/hooks/useTodoFilter.js
import { useState, useMemo, useCallback } from 'react'
import { TodoFilterService } from '../services/TodoFilterService.js'

export function useTodoFilter(todos) {
  const [currentFilter, setCurrentFilter] = useState('all')
  const [filterService] = useState(() => new TodoFilterService())

  const filteredTodos = useMemo(() => {
    return filterService.filter(todos, currentFilter)
  }, [todos, currentFilter, filterService])

  const changeFilter = useCallback((filter) => {
    setCurrentFilter(filter)
  }, [])

  return {
    filteredTodos,
    currentFilter,
    changeFilter
  }
}