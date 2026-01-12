export class Habit {
    constructor(id, text, frequency, tag, completions, streak, createdAt, isCompleted, targetDays = [], customInterval = 1, longestStreak = 0 , dayIndex ) {
        this.id = id;
        this.text = text;
        this.frequency = frequency;
        this.tag = tag
        this.completions = completions;
        this.streak = streak;
        this.createdAt = createdAt ;
        this.isCompleted = isCompleted;
        this.targetDays = targetDays;
        this.customInterval = customInterval;
        this.longestStreak = longestStreak;
        this.dayIndex = dayIndex;
    }

    updateText(text) {
        this.text = text
    }

    updateDayIndex(dayIndex) {
        this.dayIndex = dayIndex
    }
    updateTargetDays(targetDays) {
        this.targetDays = targetDays
    }

    updatecreatedAt(createdAt) {
        this.createdAt = createdAt
    }
    updateFrequency(frequency) {
        this.frequency = frequency
    }

    updateTag(tag) {
        this.tag = tag
    }

    markComplete(date) {
        console.log('markComplete', date.toISOString().split('T')[0])
        this.isCompleted = true;
        this.completions.push(date.toISOString().split('T')[0]);
        this.calculateStreak(date);
    }

    unmarkComplete(date) {
        console.log(this.daysSinceLastCompletion())
        console.log(this.getCompletionRate())
        
        console.log('unmarkComplete', date)
        this.isCompleted = false;
        // Remove just one instance of the date, popping the last occurrence if present
        // const idx = this.completions.lastIndexOf(date);
        // if (idx !== -1) {
        //     this.completions.splice(idx, 1);
        // }
        this.completions.splice(this.completions.indexOf(date.toISOString().split('T')[0]), 1);
        this.resetStreak();
    }

    isCompleteToday(date) {
        console.log('isCompleteToday', date.toISOString().split('T')[0])
        // const today = new Date().toISOString().split('T')[0];
        return this.completions.includes(date.toISOString().split('T')[0]);  // Simpler and correct
    }

    resetStreak() {
        this.streak = 0;
    }

    // In Habit.js - add this method
    isDueOnDate(date) {
        const checkDate = new Date(date);
        const created = new Date(this.createdAt);
        
        // Reset time to compare dates only
        checkDate.setHours(0, 0, 0, 0);
        created.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((checkDate - created) / (1000 * 60 * 60 * 24));
        
        if (this.frequency === 'Interval') {
            // Due every X days from creation date
            return daysDiff % this.customInterval === 0;
        }
        return true; // For other frequencies
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

    calculateStreak(currentDate) {
        if (!this.completions || this.completions.length === 0) {
            this.streak = 0;
            return 0;
        }

        // Always work with sorted (descending) completion dates (latest first)
        const completionsSorted = [...this.completions].sort().reverse();

        // Get the dates as strings YYYY-MM-DD
        const completionDates = completionsSorted.map(date =>
            typeof date === 'string'
            ? date
            : (new Date(date)).toISOString().split('T')[0]
        );

        let streak = 0;
        let freq = (this.frequency || '').toLowerCase();
        let lastDate = new Date(completionDates[0]);
        let checkDate = new Date(currentDate);
        let todayStr = checkDate.toISOString().split('T')[0];

        // If latest completion is after today, adjust to today
        if (lastDate > checkDate) lastDate = new Date(todayStr);

        function dayDiff(d1, d2) {
            // Returns integer days between d1 and d2 (d1 - d2)
            const dt1 = new Date(d1);
            const dt2 = new Date(d2);
            return Math.floor((dt1 - dt2) / (1000 * 60 * 60 * 24));
        }

        // For Daily: need consecutive days, starting from today or latest completion
        if (freq === "daily") {
            // we want to start from today: if today is completed, or else from the latest
            let date = todayStr;
            if (!completionDates.includes(todayStr) && completionDates.includes(lastDate.toISOString().split('T')[0])) {
                // if today not complete, but last completion is not today but yesterday, try from yesterday
                let yesterday = new Date(checkDate);
                yesterday.setDate(yesterday.getDate() - 1);
                date = yesterday.toISOString().split('T')[0];
            }

            let found = true;
            let dayOffset = 0;

            // count back as long as there's an entry for each previous day
            while (found) {
                if (completionDates.includes(date)) {
                    streak++;
                    dayOffset++;
                    let prev = new Date(date);
                    prev.setDate(prev.getDate() - 1);
                    date = prev.toISOString().split('T')[0];
                } else {
                    found = false;
                }
            }
        }
        // For Weekly and Custom: treat as weekly for now
        else if (freq === "weekly" || freq === "custom") {
            // Count back, each completed week in a row increases streak
            // Assume: 7-day window = a week
            let latest = lastDate;
            let streakBaseDate = checkDate;

            // Try matching by checking if there's one completion in last 7 days in row
            while (true) {
                // Find a completion in the last 7 days from streakBaseDate
                let foundWeek = false;
                for (let i = 0; i < 7; i++) {
                    let testDate = new Date(streakBaseDate);
                    testDate.setDate(testDate.getDate() - i);
                    let testStr = testDate.toISOString().split('T')[0];
                    if (completionDates.includes(testStr)) {
                        foundWeek = true;
                        // Move the streak base to day before this found date
                        streakBaseDate = new Date(testDate);
                        streakBaseDate.setDate(streakBaseDate.getDate() - 1);
                        break;
                    }
                }
                if (foundWeek) {
                    streak++;
                } else {
                    break;
                }
            }
        }
        // For Monthly: if completed in last 31 days, streak +1 for each distinct month with a completion, up to breaking
        else if (freq === "monthly") {
            // Group completions by months
            let curr = new Date(checkDate);
            // loop until break
            while (true) {
                let y = curr.getFullYear();
                let m = curr.getMonth();
                // Get any completion within this year-month and within last 31 days
                let found = false;
                for (let c of completionDates) {
                    let date = new Date(c);
                    if (date.getFullYear() === y && date.getMonth() === m &&
                        dayDiff(curr, date) <= 31 && dayDiff(curr, date) >= 0
                    ) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    streak++;
                    // Move to previous month
                    curr.setDate(1); // safe to next month
                    curr.setMonth(curr.getMonth() - 1);
                    curr.setDate(new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate());
                } else {
                    break;
                }
            }
        }

            // For Interval-based: "every 2 days", "every 3 days", etc.
            else if (freq.startsWith("every") && freq.includes("days")) {
                // Parse interval from string like "every 2 days" → 2
                const interval = parseInt(freq.match(/\d+/)?.[0]) || this.customInterval || 1;
                
                let streakBaseDate = new Date(checkDate);
                
                while (true) {
                    const dateStr = streakBaseDate.toISOString().split('T')[0];
                    
                    if (completionDates.includes(dateStr)) {
                        streak++;
                        // Move back by interval days
                        streakBaseDate.setDate(streakBaseDate.getDate() - interval);
                    } else if (streak === 0) {
                        // If no completion today, try from last expected date
                        streakBaseDate.setDate(streakBaseDate.getDate() - 1);
                        // Only allow one day grace period
                        if (!completionDates.includes(streakBaseDate.toISOString().split('T')[0])) {
                            break;
                        }
                    } else {
                        break; // Streak broken
                    }
                }
            }
        // fallback: original
        else {
            streak = 0;
        }

        this.streak = streak;
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

    setCompletions(completions) {
        this.completions = completions;
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
            plainObject.targetDays,
            plainObject.customInterval,
            plainObject.longestStreak,
            plainObject.dayIndex

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
            targetDays: this.targetDays,
            customInterval: this.customInterval,
            longestStreak: this.longestStreak,
            dayIndex: this.dayIndex
        };
    }
}

