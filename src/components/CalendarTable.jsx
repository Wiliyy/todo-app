import React, { useEffect, useState } from 'react'

function CalendarTable({handleCalendarClick, selectedDay, setSelectedDay, viewMonth, setViewMonth, viewYear, setViewYear, months, filteredTodos}) {

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const currentDay = currentDate.getDate()
    const currentDayOfWeek = currentDate.getDay()


    
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
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    useEffect(() => {
        setSelectedDay(currentDay)
    }, [currentDay])
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
            results.push(callback(day , day - 1));  // Pass index (day - 1 for 0-based)
        }
        return results;
    }
    

  return (
    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems:'center',
                        // justifyContent:'center',
                        // padding:'1cap',
                        backgroundColor: 'var(--secondary-color)',
                        // borderRadius:'var(--global-border-radius)',
                        // boxShadow:'0 0px 4px 0 rgba(255, 255, 255, 0.5)',
                        // width: '100%',
                        // height: '90%',
                        // padding: '0 1%',
                        // gap: '3%',
                        
                    }}
                >

                    <div

                        style={{
                            // display: 'flex',
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            // justifyContent: 'space-between',
                            alignItems:"center",
                            // gap: '1cap',
                            // padding: '0 1%',
                        }}
                    >

                        <div
                            className='filter-buttons-date-container-left'
                        >
                            <div
                            onClick={goToPrevMonth}
                            style={{
                                // width:"3cap",
                                // height:"3cap",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
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
                            gridColumn:"2 / 7",
                            textAlign:"center",
                            fontSize:"16px",
                            fontWeight:"600",
                            color:"var(--text-color)",
                            textTransform:"capitalize",
                            fontFamily:"system-ui, Avenir, Helvetica, Arial, sans-serif",
                        }}
                        
                        > {months[viewMonth]} , {viewYear} </p>
                        <div
                            className='filter-buttons-date-container-right'
                        >
                            <div
                            onClick={goToNextMonth}
                            
                            style={{
                                width:"3cap",
                                height:"3cap",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
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

                            // display: 'flex',
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // justifyContent: 'space-between',
                            gap: '1cap',
                            // padding:'0 1cap',
                            // borderBottom: '1px solid var(--text-color-secondary-hover)',
                            borderTop: '1px solid var(--text-color-secondary-hover)',
                            padding: '0 1%',
                            marginTop:"10px",
                            alignItems:"center",
                        }}
                    >
                        {daysOfWeek.map((day, i) => (
                            <p key={day}
                            style={{
                                textAlign:"center",
                                fontSize:"16px",
                                fontWeight:"600",
                                color: selectedDay < 7  == i ? 'var(--button-color-checked)' : selectedDay > 7 && selectedDay / 7 ? 'var(--button-color-checked)' : 'var(--text-color)',
                                textTransform:"capitalize",
                                fontFamily:"system-ui, Avenir, Helvetica, Arial, sans-serif",
                                
                            }}
                            >{day}</p>
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
                        {mapDaysOfMonth(currentMonth, currentYear, (day , index) => 
                        <div 
                        key={index}
                            onClick={() => {
                                // console.log(day)
                                // console.log(selectedDay)
                                // console.log('day clicked', day)
                                setSelectedDay(day)
                                handleCalendarClick()
                                // onClick()
                        }}
                        style={{
                            backgroundColor: selectedDay == index + 1 ? 'var(--button-color-checked)' : '',
                            borderRadius: 'var(--global-border-radius)',
                            borderBottom: '1px solid var(--text-color-secondary-hover)',
                            borderTop: index != days.length - 1 ? '1px solid var(--text-color-secondary-hover)' : 'none',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                        className='filter-buttons-date-container-day'
                        >
                            <p
                            style={{
                                color: selectedDay == index + 1 ? 'var(--secondary-color)' : 'var(--text-color)',
                                position: 'relative',
                            }}
                            >
                                {day}
                                </p>
                                {(filteredTodos.filter(todo => 
                                    new Date(todo?.targetDays).getDate() == day &&
                                    new Date(todo?.targetDays).getMonth() == viewMonth &&
                                    new Date(todo?.targetDays).getFullYear() == viewYear &&
                                    todo?.isCompleted == false).length
                                
                                > 0 && selectedDay != day) &&
                                <span className='filter-date-button-count'>
                                    {
                                    filteredTodos.filter(todo =>
                                        todo.isCompleted == false &&
                                         new Date(todo.targetDays).getDate() == day).length
                                    }
                                </span>}
                        </div>
                        )}
                    </div>





                </div>
  )
}

export default CalendarTable