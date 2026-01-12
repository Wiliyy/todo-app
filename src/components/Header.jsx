import React from 'react'
import CalenderCard from './CalenderCard'

function Header({ themeIcons, completedTodos, totalTodos, theme, toggleTheme, isCalendarVisible, setIsCalendarVisible, viewMonth, viewYear, selectedDay, setViewMonth, setViewYear, setSelectedDay, handleTaskCount , selectedTag , filteredTodos}) {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >

            {/* <div>
                <div className="todo-form-hero-progress">
                    {
                        (
                            (
                                handleTaskCount('all') != handleTaskCount('completed')
                        )
                        )
                            ? <p>
                                {

                                handleTaskCount('all') 
                                + ' / ' + 
                                    handleTaskCount('active') 
                                
                                } 
                            </p>
                            :
                            <svg
                                style={{}}
                                width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 10 18 4 12" />
                            </svg>
                    }
                </div>
            </div> */}
             <CalenderCard
                                cardWidth="8cap"
                                cardHeight="8cap"
                                upperHieght="25%"
                                LeftWidth="6%"
                                RightWidth="6%"
                                dayFontSize="1cap"
                                dayNumberFontSize="1.5cap"
                                monthFontSize="1.5cap"
                                onClick={() => setIsCalendarVisible(!isCalendarVisible)}
                                viewMonth={viewMonth}
                                setViewMonth={setViewMonth}
                                viewYear={viewYear}
                                setViewYear={setViewYear}
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                                filteredTodos={filteredTodos}
        
                            />
            <p>

            </p>
            <div

                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    backgroundColor: 'var(--button-color)',
                    borderRadius: '999px',
                    // padding: '10px',
                    /* padding: 10px; */
                    // width: 4.3cap;
                    // height: 4.3cap;
                    width: '4.48cap',
                    height: '4.48cap',
                }}
            >
                <button
                    onClick={toggleTheme}
                    style={{
                        //   position: 'fixed',
                        top: '10px',
                        right: '10px',
                        padding: '10px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: 'var(--button-color)',
                        color: 'var(--secondary-color)',
                        cursor: 'pointer',
                        zIndex: 9999,
                    }}
                >
                    <p
                    style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--text-color)',
                        margin: 0,
                        padding: 0,
                        textAlign: 'center',
                        // border: '1px solid var(--text-color-secondary)',
                        // borderRadius: '50%',
                        // padding: '10px',
                        // width: '20px',
                        // height: '20px',
                        // display: 'flex',
                        // alignItems: 'center',
                        // justifyContent: 'center',
                    }}
                    >
                    {themeIcons[theme]}
                    </p>
                </button>
            </div>
        </div>
    )
}

export default Header