import React, { useEffect, useState } from 'react'
import { isPreviousDay } from '../Logic/previosDate'
import { daysOfWeek } from '../Logic/DaysOfTheWeek'

function CalendarTable({ handleCalendarClick, selectedDay, setSelectedDay, viewMonth, setViewMonth, viewYear, setViewYear, months, filteredTodos, isFormEditingVisible, isFormVisible }) {

    // const daysOfWeek = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']
    // let daysOfWeek 


    useEffect(() => {
      if (!daysOfWeek) {
        return 
      }
    }, [])

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const currentDay = currentDate.getDate()
    const currentDayOfWeek = currentDate.getDay()

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, etc.
    }

    const handleSelectDate = (day) => {
        if (isPreviousDay(day, viewYear, viewMonth ) ) {
            return false
        }
        return true
    }


    const handleColorDate = (index) => {
        if ((!isFormEditingVisible && !isFormVisible) && index +1 == selectedDay) {
            return true
        }
        if ((!isPreviousDay(index + 1, viewYear, viewMonth) && selectedDay == index + 1)) {
            return true
        }
        return false
    }

    const goToPrevMonth = () => {

        if (viewMonth === 0) {
            setViewMonth(11)
            setViewYear(viewYear - 1)
        } else {
            setViewMonth(viewMonth - 1)
        }
    }

    const goToNextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0)
            setViewYear(viewYear + 1)
        } else {
            setViewMonth(viewMonth + 1)
        }
    }
    const getDaysInMonth = (month, year) => {
        if (month === 1 && year % 4 === 0) {
            return 29
        }
        return daysInMonth[month]
    }

    // Function to map through all days of the given month and year.
    const mapDaysOfMonth = (month, year, callback) => {
        const totalDays = getDaysInMonth(month, year);
        const results = [];
        for (let day = 1; day <= totalDays; day++) {
            results.push(callback(day, day - 1));  // Pass index (day - 1 for 0-based)
        }
        return results;
    }


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--secondary-color)',

            }}
        >

            <div

                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    alignItems: "center",
                }}
            >

                <div
                    className='filter-buttons-date-container-left'
                >
                    <div
                        onClick={goToPrevMonth}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--text-color-secondary-hover)",
                            borderRadius: "var(--global-border-radius)",
                        }}
                    >
                        <span style={{
                            display: "inline-block",
                            cursor: "pointer",
                            padding: "0.5cap",
                            // width:"1.5em",
                            // height:"1.5em",
                        }}>
                            <svg
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    verticalAlign: "middle"
                                }}
                            >
                                <path d="M15 6l-6 6 6 6" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>

                <p
                    style={{
                        gridColumn: "2 / 7",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "var(--text-color)",
                        textTransform: "capitalize",
                        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
                    }}

                > {months[viewMonth]} , {viewYear} </p>
                <div
                    className='filter-buttons-date-container-right'
                >
                    <div
                        onClick={goToNextMonth}

                        style={{
                            width: "3cap",
                            height: "3cap",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--text-color-secondary-hover)",
                            borderRadius: "var(--global-border-radius)",
                        }}
                    >
                        <span style={{
                            display: "inline-block",
                            cursor: "pointer",
                            padding: "0.5cap",
                        }}>
                            <svg
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    verticalAlign: "middle"
                                }}
                            >
                                <path d="M9 6l6 6-6 6" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>

            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '1cap',
                    borderTop: '1px solid var(--text-color-secondary-hover)',
                    padding: '0 1%',
                    marginTop: "10px",
                    alignItems: "center",
                }}
            >
                {daysOfWeek.map((day, i) => (
                    <p key={day}
                        style={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: (!isPreviousDay(i + 1, viewYear, viewMonth) || currentDayOfWeek  == i) ? 'var(--button-color-checked)' : 'var(--text-color-secondary-hover)',
                            textTransform: "capitalize",
                            fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
                        }}
                    >
                        {day.slice(0, 3)}
                    </p>
                ))}
            </div>

            <div
                className='filter-buttons-date-container-calendar'
                style={{
                    width: '100%',
                    height: '100%',
                    gap: '1cap'
                }}
            >
                {Array.from({ length: getFirstDayOfMonth(viewMonth, viewYear) }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {mapDaysOfMonth(viewMonth, viewYear, (day, index) =>
                    <div
                        key={index}
                        // disabled={!handleSelectDate(index + 1)}
                        onClick={() => {
                            if (!handleSelectDate(index + 1)) {
                                return false
                            } else {
                                setSelectedDay(day)
                                handleCalendarClick()
                            }
                        }}
                        style={{
                            backgroundColor: handleColorDate(index) ?
                            !handleSelectDate(index + 1) ? 'var(--text-color-secondary-hover)' :
                            'var(--button-color-checked)' : '',
                            borderRadius: 'var(--global-border-radius)',
                            borderBottom: '1px solid var(--text-color-secondary-hover)',
                            // borderTop: index != daysOfWeek.length - 1 ? '1px solid var(--text-color-secondary-hover)' : 'none',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                        className='filter-buttons-date-container-day'
                    >
                        <p
                            style={{
                                color:
                                    selectedDay == index + 1
                                        &&
                                        handleColorDate(index) ?
                                        'var(--secondary-color)'
                                        :
                                        !handleSelectDate(index + 1) ?
                                            'var(--text-color-secondary-hover)'
                                            :
                                            'var(--text-color)',

                                position: 'relative',
                            }}
                        >
                            {
                                day
                                // viewMonth
                                // viewYear < currentYear  ? 'today': ''
                                // viewMonth < currentMonth  ? 'today': ''
                                // currentMonth + 1 

                            }
                        </p>
                        {/* {(filteredTodos.filter((todo, index) =>
                        (
                            todo.dayIndex.includes(day < 7 ? day : day % 7)
                        ) ||
                        new Date(todo?.targetDays).getDate() == day &&
                        new Date(todo?.targetDays).getMonth() == viewMonth &&
                        new Date(todo?.targetDays).getFullYear() == viewYear 
                        
                    ).length
                    
                    > 0
                ) 
                &&
                <span className='filter-date-button-count'>
                                {
                                    filteredTodos.filter((todo, i) =>
                                        (
                                            // todo.isCompleted == false
                                            // !todo.frequency == 'No Repeat' &&
                                            !todo.completions.includes(new Date(viewYear, viewMonth, day ).toISOString().split('T')[0])
                                            
                                        )
                                        
                                        &&
                                        // !todo.frequency == 'No Repeat' &&
                                        !todo.completions.includes(new Date(viewYear, viewMonth, day ).toISOString().split('T')[0])
                                    ).length
                                }


                            </span>
                        } */}
                    </div>
                )
                }
            </div>





        </div>
    )
}

export default CalendarTable