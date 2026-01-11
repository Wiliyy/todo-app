import { useState, useCallback } from 'react'
import { HabitService } from '../services/HabitService'
import { Habit } from '../models/Habit'

export function useHabits(initialHabits = []) {

    const [habits, setHabits] = useState(() =>
        initialHabits.map(h => Habit.fromPlainObject(h))
    )


    const [service] = useState(() => {
        const habitService = new HabitService()
        // habitService.habits = initialHabits.map(h => Habit.fromPlainObject(h))
        initialHabits.forEach(habit => {
            habitService.addHabit(habit.text, habit.frequency || "Daily", habit.tag || "Quick")
        })
        return habitService
    })

    


    const addHabit = useCallback((text, frequency, tag)=>{
        const newHabit = service.addHabit(text, frequency, tag)
        setHabits(prev => [...prev, newHabit])
    }, [service])

    const updateTag = useCallback((id, newTag) => {
        service.updateTag(id, newTag)
        setHabits(prev => prev.map(t =>
            t.id === id ? Todo.fromPlainObject(t.toPlainObject()) : t
        ))
    }, [service])

    const deleteHabit = useCallback((id)=>{
        service.deleteHabit(id)
        setHabits(prev => prev.filter(h => h.id !== id))
    }, [service])

    const toggleHabit = useCallback((id) => {
        const updatedHabit = service.toggleHabit(id)
        if (!updatedHabit) return
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
    }, [service])

    const isCompleteToday = useCallback((id) => {
        const habit = service.getHabit(id)
        return habit.isCompleteToday()
    }, [service])

    const updateHabit = useCallback((id, newText) => {
        service.updateHabit(id, newText)
        setHabits(prev => prev.map(h => h.id === id ? Habit.fromPlainObject(h.toPlainObject()) : h))
    }, [service])
    return {
        habits: habits.map(h => h.toPlainObject()),
        addHabit,
        deleteHabit,
        toggleHabit,
        updateHabit,
        updateTag,
        isCompleteToday
    }
}

