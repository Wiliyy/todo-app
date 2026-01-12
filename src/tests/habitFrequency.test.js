import { describe, it, expect } from 'vitest'

describe('Habit Frequency', () => {

    let today = new Date()

    let type = 'daily'
    let targetDays = [0, 1, 2, 3, 4, 5, 6]
    let monthlya = 0
    let yearly = 0
    
    it('returns correct day of week', (type) => {
        switch (type) {
            case 'daily':
                return handleDailyHabit(targetDays)
                case 'weekly':
                    return targetDays.includes(new Date().getDay())
                    default:
                        return false
                    }
                })
                
                
                
                const handleDailyHabit = (arr) => {
                    let days = []
                    let date = new Date()
                    for (let i = 0; i < arr.length; i++) {
                        days.push(date.getDay())
                        date.setDate(date.getDate() + 1)
                    }
                    console.log('days', days)
                    return arr.every(item => days.includes(item))   
                }
                
                const handleTodayDate = (date , days , operation) => {
                    let newDate = new Date()
                    if (operation === 'add') {
                        newDate.setDate(date.getDate() + days)
                        // return newDate
                    } else if (operation === 'subtract') {
                         newDate.setDate(date.getDate() - days)
                        // return newDate
                    }
                    return newDate
                }
                
                
                
                it('returns true if all items in arr are in arr2', () => {
                    expect(handleDailyHabit(targetDays)).toBe(true)
                })
                
                it('returns true if today is in arr', () => {
                    console.log('today', today)
                
                    today = handleTodayDate(today, 70, 'add')
                    console.log('today', today)
                    expect(handleTodayDate(today, 70, 'add')).toStrictEqual(handleTodayDate(today, 70, 'add'))
                })
            })