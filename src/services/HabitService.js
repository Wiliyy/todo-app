import { Habit } from '../models/Habit';

export class HabitService {
    constructor() {
        this.habits = [];
    }

    addHabit(text, frequency , tag ,targetDate , dayIndex) {
        const id = this.generateId();
        
        const habit = new Habit(
            id,
            text,
            frequency ,
            tag,
            [],
            0,    
            new Date()
            ,
            false,
                targetDate
            ,
            1,
            0,
            dayIndex
        );
        this.habits.push(habit);
        return habit;
    }


    deleteHabit(id) {
        this.habits = this.habits.filter(habit => habit.id !== id);
    }

    toggleHabit(id , date ) {
        console.log('toggleHabit', id, date)
        const habit = this.habits.find(habit => habit.id === id);
        if (!habit) return ; // Guard clause
        // const today = new Date().toISOString().split('T')[0];
        // const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        if (habit.isCompleteToday(date)) {
            // Already completed today → remove today from completions (un-complete)
            // habit.completions = habit.completions.filter(date => date !== today);
            
            // habit.streak = Math.max(0, habit.streak - 1); // Decrease streak
            // habit.toggle(today);
            habit.unmarkComplete(date);
        } else {
            // Not completed today → add today to completions
            habit.markComplete(date);
            // habit.toggle(today);
        }
        
        return habit; // Return for state update
    }
    
    updateHabit(id, newText, updateTargetDays, updateFrequency, selectedDays, selectedTag) {
        const habit = this.habits.find(h => h.id === id)
        if (habit) {
            habit.updateText(newText)
            habit.updateTargetDays(updateTargetDays)
            habit.updateFrequency(updateFrequency)
            habit.updateDayIndex(selectedDays)
            habit.updateTag(selectedTag)
            habit.updatecreatedAt(updateTargetDays)
            return habit
        }
        return null
    }


    updateHabitTag(id, newTag) {
        console.log('habits', this.habits)
        const habit = this.habits.find(h => h.tag === id)
        console.log('updateHabitTag service', id, newTag)
        console.log('habit', habit)
        if (habit) {
            habit.updateTag(newTag)
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

    setCompletions(id, completions) {
        const habit = this.habits.find(h => h.id === id)
        if (habit) {
            habit.setCompletions(completions)
            return habit
        }
        return null
    }

    updateDayIndex(id, dayIndex) {
        const habit = this.habits.find(h => h.id === id)
        if (habit) {
            habit.updateDayIndex(dayIndex)
            return habit
        }
        return null
    }

}