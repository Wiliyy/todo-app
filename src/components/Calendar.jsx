import React, { useState, useEffect } from 'react'
import CalendarTable from './CalendarTable'
import CalenderCard from './CalenderCard'

function Calendar({onClick, viewMonth, setViewMonth, viewYear, setViewYear, selectedDay, setSelectedDay, filteredTodos}) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    

    return (
        


            <div
                style={{
                    width: '100%',
                    // height: '100%',
                    // display: 'flex',
                    // flexDirection: 'row',
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                    display: windowWidth > 600 ? 'grid' : 'flex',
                    flexDirection:'column-reverse',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(1, 1fr)',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    gap:windowWidth > 600 ? '5%' : '0',
                    padding:windowWidth > 600 ? '5% 5% 0 5%' : '0',
                    alignItems: 'center',
                    // height: '100%',
                    backgroundColor: 'var(--secondary-color)',
                    borderRadius: 'var(--global-border-radius)',
                    // boxShadow: '0 0px 4px 0 rgba(255, 255, 255, 0.5)',
                }}
            >

                <CalendarTable  
                filteredTodos={filteredTodos}
                handleCalendarClick={onClick}
                months={months}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                viewMonth={viewMonth}
                setViewMonth={setViewMonth}
                viewYear={viewYear}
                setViewYear={setViewYear}
                />
                <CalenderCard 
                onClick={onClick}
                months={months}
                viewMonth={viewMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                cardWidth="100%"
                cardHeight="50cap" 
                dayFontSize="15cap"
                monthFontSize="5cap" 
                upperHieght="20%" 
                LeftWidth="2cap" 
                RightWidth="2cap" 
                />   
            </div>
            
    )
}

export default Calendar
