export class Habit {
    constructor(id, text, frequency, tag, completions, streak, createdAt, isCompleted, targetDays = [], customInterval = 1, longestStreak = 0) {
        this.id = id;
        this.text = text;
        this.frequency = frequency;
        this.tag = tag
        this.completions = completions;
        this.streak = streak;
        this.createdAt = createdAt;
        this.isCompleted = false;
        this.targetDays = targetDays;
        this.customInterval = customInterval;
        this.longestStreak = longestStreak;
    }

    updateText(text) {
        this.text = text
    }

    updateTag(tag) {
        this.tag = tag
    }

    markComplete(date) {
        this.isCompleted = !this.isCompleted;
        this.completions.push(date);
        this.streak++;

    }

    unmarkComplete(date) {
        this.isCompleted = !this.isCompleted;
        this.completions = this.completions.filter(d => d !== date);
        this.resetStreak();
    }

    isCompleteToday() {
        const today = new Date().toISOString().split('T')[0];
        return this.completions.includes(today);  // Simpler and correct
    }

    calculateStreak() {
        return this.completions.filter(completion => completion.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]).length;
    }

    resetStreak() {
        this.streak = 0;
    }


    // Add these methods:

    isDueToday() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0=Sun, 6=Sat

        switch (this.frequency) {
            case 'daily':
                return true;
            case 'weekly':
                // targetDays = [1,3,5] means Mon, Wed, Fri
                return this.targetDays?.includes(dayOfWeek) ?? true;
            case 'custom':
                return this.daysSinceLastCompletion() >= this.customInterval;
            default:
                return true;
        }
    }

    daysSinceLastCompletion() {
        if (this.completions.length === 0) return Infinity;
        const sorted = [...this.completions].sort();
        const lastDate = new Date(sorted[sorted.length - 1]);
        const today = new Date();
        return Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    }

    calculateStreak() {
        if (this.completions.length === 0) return 0;

        const sorted = [...this.completions].sort().reverse();
        const today = new Date().toISOString().split('T')[0];

        let streak = 0;
        let checkDate = new Date(today);

        for (let i = 0; i < 365; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (sorted.includes(dateStr)) {
                streak++;
            } else if (i > 0) {
                break; // Streak broken
            }
            checkDate.setDate(checkDate.getDate() - 1);
        }
        return streak;
    }

    getCompletionRate(days = 30) {
        const today = new Date();
        let completed = 0;

        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            if (this.completions.includes(dateStr)) completed++;
        }
        return Math.round((completed / days) * 100);
    }

    static fromPlainObject(plainObject) {
        return new Habit(
            plainObject.id,
            plainObject.text,
            plainObject.frequency,
            plainObject.tag,
            plainObject.completions,
            plainObject.streak,
            plainObject.createdAt,
            plainObject.isCompleted,
        );
    }

    toPlainObject() {
        return {
            id: this.id,
            text: this.text,
            frequency: this.frequency,
            tag: this.tag,
            completions: this.completions,
            streak: this.streak,
            createdAt: this.createdAt,
            isCompleted: this.isCompleted,
        };
    }
}

