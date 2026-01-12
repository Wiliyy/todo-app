import React, { useState } from 'react'
import '../styles/TodoForm.css'
import CalenderCard from './CalenderCard'
import Calendar from './Calendar'
import CalendarTable from './CalendarTable'

function TodoForm({handleAppClick , isFormVisible, input, setInput, handleSubmit, selectedType, setSelectedType, isCalendarVisible, setIsCalendarVisible, filteredTodos, viewMonth, setViewMonth, viewYear, setViewYear, selectedDay, setSelectedDay }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  

  const handleSelectedTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

const handleChange = (e) => {
    setInput(e.target.value)
}

const CalendarIcon = () => {
  return (
    <span
      style={{
        margin: 0,
        padding: 0,
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text-color-secondary-hover)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '0.4em' }}
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </span>
  )
}

const RepeatIcon = () => {
  return (
    <span
      style={{
        margin: 0,
        padding: 0,
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text-color-secondary-hover)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '0.4em' }}
      >
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    </span>
  )
}
  return (
    <form 
    style={{ display: isFormVisible ? 'flex' : 'none' }}
    className='todo-form-container' onSubmit={handleSubmit} onClick={(e) => {e.stopPropagation() , handleAppClick(e)}}>
      { isFormVisible && <div className='todo-form-container-inner' onClick={handleAppClick}>
          <div className="todo-form" 
          
          >

            <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1cap',
              width: '100%',
            }}
            >
                <input
                  className="todo-form-input"
                  placeholder='write your next task'
                  type="text"
                  value={input}
                  onChange={handleChange}
                  onClick={(e) => {e.stopPropagation()}}
                  autoFocus
                  />
                  <button className="todo-form-button" onClick={(e) => { e.stopPropagation(); handleSubmit(e); }}> + </button>
                  </div>
                {
                  !isCalendarVisible ?
                  <div 
                style={{ 
                  position: 'relative', 
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  gap: '1cap',
                  width: '100%',
                  // border: '1px solid var(--button-color)',
                }}>
                  <div
                  onClick={() => {
                    setIsCalendarVisible(!isCalendarVisible)
                    // setSelectedDay(new Date().getDate())
                    // setViewMonth(new Date().getMonth())
                    // setViewYear(new Date().getFullYear())
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    justifyContent: 'space-around',
                    gap: '.4cap',
                    width: '10cap',
                    border: '1px solid var(--text-color-secondary-hover)',
                    // padding: '1cap',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    // textAlign: 'left',
                    margin: 0,
                    padding: 0,
                  }}
                  >
                    <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontWeight: '600',
                      // textAlign: 'left',
                      color: 'var(--text-color-secondary)',
                    }}
                    >
                      
                      {(selectedDay && selectedDay != new Date().getDate()) ? `${selectedDay} ${months[viewMonth].slice(0, 3)} ${viewYear}` : 'Today'} 
                     </p>
                    <p
                    style={{
                      color: 'var(--text-color-secondary)',
                    }}
                    >{CalendarIcon()}</p>
                  </div>
                  <div
                  onClick={() => {
                    // setIsCalendarVisible(!isCalendarVisible)
                    // setSelectedDay(new Date().getDate())
                    // setViewMonth(new Date().getMonth())
                    // setViewYear(new Date().getFullYear())
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    // gap: '1cap',
                    width: '10cap',
                    border: '1px solid var(--text-color-secondary-hover)',
                    // padding: '1cap',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    // textAlign: 'left',
                    margin: 0,
                    padding: 0,
                  }}
                  >
                    <select
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-color-secondary)',
                      borderRadius: 'var(--global-border-radius)',
                      padding: 0,
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      margin: 0,
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none',
                      border: 'none',
                      outline: 'none', // Ensure no outline on focus as well
                    }}
                    value={selectedType}
                    onChange={handleSelectedTypeChange}
                    onClick={e => e.stopPropagation()}
                    className="todo-form-dropdown"
                    onFocus={e => { e.target.style.border = 'none'; e.target.style.outline = 'none'; }}
                  >
                    <option value="">No Repeat</option>
                    <option value="Daily">Daily {CalendarIcon()}</option>
                    <option value="Weekly">Weekly {CalendarIcon()}</option>
                    <option value="Monthly">Monthly {CalendarIcon()}</option>
                  </select>
                  <p>{RepeatIcon()}</p>
                  </div>
                  
                </div>
                :
                <>
                <CalendarTable
                handleCalendarClick={() => {
                  
                  setIsCalendarVisible(!isCalendarVisible)
                  console.log(isCalendarVisible)
                }}
                viewMonth={viewMonth}
                setViewMonth={setViewMonth}
                viewYear={viewYear}
                setViewYear={setViewYear}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                filteredTodos={filteredTodos}
                months={months}
                />
                </>
                }
                  
            </div>
        </div>
        }
    </form>
  )
}

export default TodoForm