import { useState, useCallback, useEffect } from 'react'
import { HabitService } from '../services/HabitService'
import { Habit } from '../models/Habit'

const STORAGE_KEY = 'habits-storage'
export function useHabits(initialHabits = [] ) {

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
        // service.habits = habits
    }, [habits])


    // useEffect(() => {
    //     console.log(habits[0])
        
    //     // Log yesterday's date in YYYY-MM-DD format
    //     const yesterday = new Date();
    //     yesterday.setDate(yesterday.getDate() - 1);
    //     console.log('Yesterday:', yesterday.toISOString().split('T')[0]);

    //     const twoDaysAgo = new Date();
    //     twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    //     console.log('Two days ago:', twoDaysAgo.toISOString().split('T')[0]);
        
    //     const yesterday2 = new Date();
    //     yesterday.setDate(yesterday2.getDate() - 3);
    //     console.log(yesterday2.toISOString().split('T')[0]);
    //     console.log()
    //     setCompletions(habits[0].id, 
    //         [
    //             yesterday.toISOString().split('T')[0],
    //             twoDaysAgo.toISOString().split('T')[0]
    //         ],
    //     )
    // }, [])

    const addHabit = useCallback((text, frequency, tag, targetDate, dayIndex)=>{
        const newHabit = service.addHabit(text, frequency, tag, targetDate, dayIndex)
        setHabits(prev => [...prev, newHabit])
    }, [service])

    const deleteHabit = useCallback((id)=>{
        service.deleteHabit(id)
        setHabits(prev => prev.filter(h => h.id !== id))
        
    }, [service])

    const toggleHabit = useCallback((id, date ) => {
        const updatedHabit = service.toggleHabit(id, date)
        if (!updatedHabit) return
        // setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
        setHabits(prev => prev.map(h => 
            h.id === id ? Habit.fromPlainObject(updatedHabit.toPlainObject()) : h
        ))
    }, [service])

    const isCompleteToday = useCallback((id) => {
        const habit = service.getHabit(id)
        return habit.isCompleteToday()
    }, [service])

    const updateHabit = useCallback((id, newText, updateTargetDays, updateFrequency, selectedDays, selectedTag) => {
        const updatedHabit = service.updateHabit(id, newText, updateTargetDays, updateFrequency, selectedDays, selectedTag)
        if (!updatedHabit) return
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
    }, [service])


    const updateHabitTag = useCallback((id, newTag) => {
        console.log('updateHabitTag', id, newTag)
        const updatedHabit = service.updateHabitTag(id, newTag)
        console.log('updatedHabit', updatedHabit)
        if (!updatedHabit) return
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
    }, [service])

    const setCompletions = useCallback((id, completions) => {
        const updatedHabit = service.setCompletions(id, completions)
        if (!updatedHabit) return
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
    }, [service])

    const updateDayIndex = useCallback((id, dayIndex) => {
        const updatedHabit = service.updateDayIndex(id, dayIndex)
        if (!updatedHabit) return
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
    }, [service])


    return {
        habits: habits.map(h => h.toPlainObject()),
        addHabit,
        deleteHabit,
        toggleHabit,
        updateHabit,
        isCompleteToday,
        updateHabitTag,
        setCompletions,
        updateDayIndex
    }
}

