// src/hooks/useTodos.js
import { useState, useCallback } from 'react'
import { TodoService } from '../services/TodoService.js'
import { Todo } from '../models/Todo.js'

export function useTodos(initialTodos = []) {

    const [todos, setTodos] = useState(() =>
        initialTodos.map(t => Todo.fromPlainObject(t))
    )

    const [service] = useState(() => {

        const todoService = new TodoService()

        initialTodos.forEach(todo => {
            todoService.addTodo(todo.text)
        })

        return todoService
    })


    const addTodo = useCallback((text) => {

        const newTodo = service.addTodo(text)
        setTodos(prev => [...prev, newTodo])

    }, [service])

    const deleteTodo = useCallback((id) => {
        service.deleteTodo(id)
        setTodos(prev => prev.filter(t => t.id !== id))
    }, [service])

    const toggleTodo = useCallback((id) => {

        const updatedTodo = service.toggleTodo(id)

        if (updatedTodo) {
            setTodos(prev => prev.map(t =>
                t.id === id ? updatedTodo : t
            ))
        }
    }, [service])

    const updateTodo = useCallback((id, newText) => {
        service.updateTodo(id, newText)
        setTodos(prev => prev.map(t =>
            t.id === id ? Todo.fromPlainObject(t.toPlainObject()) : t
        ))
    }, [service])

    return {
        todos: todos.map(t => t.toPlainObject()),
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo
    }
}