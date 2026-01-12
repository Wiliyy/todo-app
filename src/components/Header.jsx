import React from 'react'
import CalenderCard from './CalenderCard'

function Header({theme, toggleTheme, isCalendarVisible, setIsCalendarVisible, viewMonth, viewYear, selectedDay, setViewMonth, setViewYear, setSelectedDay}) {
  return (
    <div
    style={{
        width:'100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: '10px',
        // border: '1px solid var(--text-color-secondary)',
    }}
    >
        {/* <CalenderCard 
        onClick={() => setIsCalendarVisible(!isCalendarVisible)}
        viewMonth={viewMonth}
        viewYear={viewYear}
        selectedDay={selectedDay}
        setViewMonth={setViewMonth}
        setViewYear={setViewYear}
        setSelectedDay={setSelectedDay}
        cardWidth="10cap"
        cardHeight="10cap" 
        dayFontSize="2cap"
        monthFontSize="2cap" 
        upperHieght="25%" 
        LeftWidth="6%" 
        RightWidth="6%" 
        /> */}
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
            padding: '10px',
        }}
        >
            {/* <button 
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
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ verticalAlign: 'middle' }}
            >
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
            </svg>
            </button> */}
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
            // border: '1px solid var(--text-color-secondary)',
            }}
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    </div>
  )
}

export default Header