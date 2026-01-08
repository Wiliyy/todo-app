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
            todoService.addTodo(todo.text, todo.tag || "Quick")
        })

        return todoService
    })

    const addTodo = useCallback((text , tag) => {

        const newTodo = service.addTodo(text, tag)
        setTodos(prev => [...prev, newTodo])

    }, [service])

    const deleteTodo = useCallback((id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return // User cancelled
        }
        
        service.deleteTodo(id)
        setTodos(prev => prev.filter(t => t.id !== id))
    }, [service])

    // src/hooks/useTodos.js
    const deleteTag = useCallback((tagId, defaultTag = "Quick task") => {
        service.deleteTag(tagId)
        // Remove all todos with this tag from state
        setTodos(prev => prev.filter(t => t.tag !== tagId))
        // Update state to reflect tag changes
        // setTodos(prev => prev.map(t => {
        //     if (t.tag === tagId) {
        //         const updated = Todo.fromPlainObject(t.toPlainObject())
        //         updated.updateTag(defaultTag)
        //         return updated
        //     }
        //     return t
        // }))
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

    const updateTag = useCallback((id, newTag) => {
        service.updateTag(id, newTag)
        setTodos(prev => prev.map(t =>
            t.id === id ? Todo.fromPlainObject(t.toPlainObject()) : t
        ))
    }, [service])

    return {
        todos: todos.map(t => t.toPlainObject()),
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        updateTag,
        deleteTag
    }
}