import { useState, useCallback, useEffect } from 'react'
import { HabitService } from '../services/HabitService'
import { Habit } from '../models/Habit'


const STORAGE_KEY = 'habits-storage'
export function useHabits(initialHabits = []) {

    // const [habits, setHabits] = useState(() =>
    //     initialHabits.map(h => Habit.fromPlainObject(h))
    // )


    // const [service] = useState(() => {
    //     const habitService = new HabitService()
    //     initialHabits.forEach(habit => {
    //         habitService.addHabit(habit.text, habit.frequency || "Daily", habit.tag || "Quick")
    //     })
    //     return habitService
    // })

     // Load from localStorage OR use initialHabits
     const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                return parsed.map(h => Habit.fromPlainObject(h))
            } catch (e) {
                console.error('Failed to parse habits from localStorage', e)
            }
        }
        return initialHabits.map(h => Habit.fromPlainObject(h))
    })

    // Initialize service with habits (sync IDs!)
    const [service] = useState(() => {
        const habitService = new HabitService()
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                habitService.habits = parsed.map(h => Habit.fromPlainObject(h))
            } catch (e) {
                console.error('Failed to load habits to service', e)
            }
        } else {
            habitService.habits = initialHabits.map(h => Habit.fromPlainObject(h))
        }
        return habitService
    })

    // Save to localStorage whenever habits change
    useEffect(() => {
        const plainHabits = habits.map(h => h.toPlainObject())
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plainHabits))
    }, [habits])


    const addHabit = useCallback((text, frequency, tag, targetDate)=>{
        const newHabit = service.addHabit(text, frequency, tag, targetDate)
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

    const updateHabit = useCallback((id, newText, updateTargetDays, updateFrequency) => {
        console.log('updateHabit in hook', id, newText, updateTargetDays, updateFrequency)
        const updatedHabit = service.updateHabit(id, newText, updateTargetDays, updateFrequency)
        if (!updatedHabit) return
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
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

