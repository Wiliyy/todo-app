import { Habit } from '../models/Habit';

export class HabitService {
    constructor() {
        this.habits = [];
    }

    addHabit(text, frequency , tag ,targetDate) {
        const id = this.generateId();
        
        const habit = new Habit(
            id,
            text,
            frequency ,
            tag,
            [],
            0,    
            new Date(),
            false,
                targetDate
            ,
            1,
            0
        );
        this.habits.push(habit);
        return habit;
    }


    deleteHabit(id) {
        this.habits = this.habits.filter(habit => habit.id !== id);
    }

    toggleHabit(id) {
        const habit = this.habits.find(habit => habit.id === id);
        if (!habit) return ; // Guard clause
        const today = new Date().toISOString().split('T')[0];
        // const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        if (habit.isCompleteToday()) {
            // Already completed today → remove today from completions (un-complete)
            habit.completions = habit.completions.filter(date => date !== today);
            
            habit.streak = Math.max(0, habit.streak - 1); // Decrease streak
            // habit.toggle(today);
            habit.unmarkComplete(today);
        } else {
            // Not completed today → add today to completions
            habit.markComplete(today);
            // habit.toggle(today);
        }
        
        return habit; // Return for state update
    }
    
    updateTag(id, newTag) {
        const todo = this.habits.find(t => t.id === id)
        if (todo) {
          todo.updateTag(newTag)
          return todo
        }
        return null
      }
    
    updateHabit(id, newText, updateTargetDays, updateFrequency) {
        console.log('updateHabit in service', id, newText, updateTargetDays, updateFrequency)
        const habit = this.habits.find(h => h.id === id)
        if (habit) {
            habit.updateText(newText)
            habit.updateTargetDays(updateTargetDays)
            habit.updateFrequency(updateFrequency)
            return habit
        }
        return null
    }
    getHabit(id) {
        return this.habits.find(habit => habit.id === id);
    }
    
    getAllHabits() {
        return this.habits;
    }

    generateId() {
        return Date.now() + Math.random();
    }


}