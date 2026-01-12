import React, { useState, useEffect } from 'react'
import CalendarTable from './CalendarTable'
import CalenderCard from './CalenderCard'

function Calendar({onClick, viewMonth, setViewMonth, viewYear, setViewYear, selectedDay, setSelectedDay, filteredTodos, isFormEditingVisible, isFormVisible }) {

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
                    padding:windowWidth > 600 ? '5% 2% 0 5%' : '0',
                    alignItems: 'center',
                    // height: '100%',
                    backgroundColor: 'var(--secondary-color)',
                    borderRadius: 'var(--global-border-radius)',
                    // boxShadow: '0 0px 4px 0 rgba(255, 255, 255, 0.5)',
                    position: 'relative',
                }}
            >

<div style={{
                        position: 'absolute',
                        top: windowWidth > 600 ? '11%' : '3%',
                        right: '1.5%',
                    }}>

                    
                        <div
                        style={{
                            position: 'absolute',
                            top: '2%',
                            right: '3%',
                            zIndex: '9999',
                        }}
                            >
                                <div
                                onClick={onClick}
                                
                                style={{
                                    width:"3cap",
                                    height:"3cap",
                                    display:"flex",
                                    borderRadius: "50%",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor: "var(--text-color-secondary-hover)",
                                    zIndex: 1000,
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
                                            <line x1="6" y1="6" x2="18" y2="18" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" />
                                            <line x1="18" y1="6" x2="6" y2="18" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                    </div>
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
                isFormEditingVisible={isFormEditingVisible}
                isFormVisible={isFormVisible}
                />
                <CalenderCard 
                onClick={onClick}
                months={months}
                viewMonth={viewMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                cardWidth="100%"
                cardHeight="50cap" 
                dayFontSize="8cap"
                dayNumberFontSize="12cap"
                monthFontSize="5cap" 
                upperHieght="20%" 
                LeftWidth="2cap" 
                RightWidth="2cap" 
                viewYear={viewYear}
                />   
            </div>
            
    )
}

export default Calendar
