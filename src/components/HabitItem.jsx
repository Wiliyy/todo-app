import '../styles/HabitItem.css'

function HabitItem({ habit, onToggle }) {

    if (habit === null) {
        return null
    }
    const isCompletedToday = habit.completions?.includes(
        new Date().toISOString().split('T')[0]
    )

    return (
        <div className={`habit-item ${isCompletedToday ? 'completed' : ''}`}>
            <button 
                className={`habit-checkbox ${isCompletedToday ? 'checked' : ''}`}
                onClick={() => onToggle(habit.id)}
            >
                {isCompletedToday && '✓'}
            </button>
            
            <div className="habit-info">
                <span className="habit-text">{habit.text}</span>
                <span className="habit-frequency">{habit.frequency}</span>
            </div>
            
            <div className="habit-stats">
                <span className="habit-streak">🔥 {habit.streak}</span>
            </div>
        </div>
    )
}

export default HabitItem