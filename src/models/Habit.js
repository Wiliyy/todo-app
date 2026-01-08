class Habit {
    constructor(id, name, description, completed, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.frequency = frequency;
        this.completions = completions;
        this.streak = streak;
        this.createdAt = createdAt;
    }

    markComplete(date) {
        this.completions.push(date);
        this.streak++;
    }

    isCompleteToday() {
        return this.completions.some(completion => completion.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]);
    }

    calculateStreak() {
        return this.completions.filter(completion => completion.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]).length;
    }

    resetStreak() {
        this.streak = 0;
    }

    fromPlainObject(plainObject) {
        return new Habit(
            plainObject.id,
            plainObject.name,
            plainObject.frequency,
            plainObject.completions,
            plainObject.streak,
            plainObject.createdAt,
        );
    }

    toPlainObject() {
        return {
            id: this.id,
            name: this.name,
            frequency: this.frequency,
            completions: this.completions,
            streak: this.streak,
            createdAt: this.createdAt,
        };
    }
}

export default Habit;