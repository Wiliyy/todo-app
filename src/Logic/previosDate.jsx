export const isPreviousDay = (day , viewYear, viewMonth) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    return new Date(viewYear, viewMonth, day).getTime() < new Date(currentYear, currentMonth, currentDay).getTime()
}

export const isAfterToday = (day , viewYear, viewMonth) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    return new Date(viewYear, viewMonth, day).getTime() > new Date(currentYear, currentMonth, currentDay + 1).getTime()
}