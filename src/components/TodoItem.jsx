// src/components/TodoItem.jsx
import '../styles/TodoItem.css'
import { useEffect, useState } from 'react'
import CalendarTable from './CalendarTable'

function TodoItem({ selectedType , setSelectedType, isCalendarVisible, setIsCalendarVisible, selectedTag, todo, onToggle, onDelete, onEdit, isEditing, onSaveEdit, onCancelEdit, handleTypeChange , viewMonth, viewYear, selectedDay ,setSelectedDay, setViewMonth, setViewYear, filteredTodos, isFormEditingVisible, setIsFormEditingVisible }) {
    if (!todo) return null

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    const [updateTargetDays , setUpdateTargetDays] = useState(new Date(todo.targetDays))


    const [updateFrequency , setUpdateFrequency] = useState(todo.frequency)


    // useEffect(() => {
    //     setUpdateFrequency(todo.frequency)
    // }, [todo.frequency])
    const handleUpdateTargetDays = () => {
        // setSelectedDay(targetDays.getDate())
        // setViewMonth(targetDays.getMonth())
        // setViewYear(targetDays.getFullYear())
        const updatedTargetDays = new Date(viewYear, viewMonth, selectedDay)
        setUpdateTargetDays(updatedTargetDays)
        console.log('updateTargetDays', updateTargetDays.getDate())
        console.log('updateTargetDays', updatedTargetDays)
    }
    const handleUpdateFrequency = (e) => {
        setUpdateFrequency(e.target.value)
    }

    console.log('updateTargetDays', updateTargetDays)

    const [editText, setEditText] = useState(todo.text)

    // const handleSelectedTypeChange = (e) => {
    //     setSelectedType(e.target.value)
    // }
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
    const handleSave = () => {
        console.log('handleSave in TodoItem', editText.trim() , new Date(viewYear, viewMonth, selectedDay), updateFrequency)
        console.log(new Date(viewYear, viewMonth, selectedDay))
        if (editText.trim()) {
            onSaveEdit(todo.id, editText.trim() , new Date(viewYear, viewMonth, selectedDay), updateFrequency)
        }
    }

    if (isEditing) {
        return (
            <div className="todo-form">
                <div className="todo-item-container"
                
                style={{
                    gap:isEditing ? '1cap' : '',
                }}
                >
                    <input
                        className="todo-form-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave()
                            if (e.key === 'Escape') onCancelEdit()
                        }}
                        autoFocus
                    />
                    <button className="todo-item-button" onClick={handleSave}>Save</button>
                    <button className="todo-item-button" 
                    onClick={onCancelEdit}>Cancel</button>



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
                    height: '100%',
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
                      
                      {/* {(updateTargetDays.getDate() && updateTargetDays.getDate() != new Date().getDate()) ? `${updateTargetDays.getDate()} ${months[updateTargetDays.getMonth()].slice(0, 3)} ${updateTargetDays.getFullYear()}` : 'Today'}  */}
                      {(selectedDay && selectedDay != new Date().getDate()) ? `${selectedDay} ${months[viewMonth].slice(0, 3)} ${viewYear}` : 'Today'} 
                     </p>
                    <p
                    style={{
                        margin: 0,
                        padding: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        // textAlign: 'left',
                        color: 'var(--text-color-secondary)',
                    }}
                    >{CalendarIcon()}
                    
                    </p>
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
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingLeft: '.5cap',
                    // gap: '1cap',
                    width: '10cap',
                    border: '1px solid var(--text-color-secondary-hover)',
                    // padding: '1cap',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    height: '100%',
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
                    //   width: '80%',
                    // paddingLeft: '.5cap',
                    }}
                    value={updateFrequency}
                    onChange={handleUpdateFrequency}
                    onClick={e => e.stopPropagation()}
                    className="todo-form-dropdown"
                    onFocus={e => { e.target.style.border = 'none'; e.target.style.outline = 'none'; }}
                  >
                    <option value="">No Repeat</option>
                    <option
                    value="Daily">Daily {CalendarIcon()}</option>
                    <option value="Weekly">Weekly {CalendarIcon()}</option>
                    <option value="Monthly">Monthly {CalendarIcon()}</option>
                  </select>
                  <p
                  
                  style={{
                    // width: '20%',
                  }}
                  >{RepeatIcon()}</p>
                  </div>
                  
                </div>
                :
                <>
                <CalendarTable
                handleCalendarClick={() => {
                    // console.log('handleCalendarClick in TodoItem')
                    // setUpdateTargetDays(new Date(updateTargetDays.getFullYear(), updateTargetDays.getMonth(), updateTargetDays.getDate()))
                    // handleUpdateTargetDays(new Date(viewYear, viewMonth, selectedDay))
                    // handleUpdateTargetDays()
                  setIsCalendarVisible(!isCalendarVisible)
                //   setSelectedDay()
                  console.log(isCalendarVisible)
                }}
                // viewMonth={updateTargetDays.getMonth()}
                // viewYear={updateTargetDays.getFullYear()}
                // selectedDay={updateTargetDays.getDate()}
                viewMonth={viewMonth}
                viewYear={viewYear}
                selectedDay={selectedDay}
                setViewMonth={setViewMonth}
                setViewYear={setViewYear}
                setSelectedDay={setSelectedDay}
                filteredTodos={filteredTodos}
                months={months}
                />
                </>
                }
            </div>
        )
    }

    let pressTimer = null

    const startPress = (id) => {
      pressTimer = setTimeout(() => onEdit(id), 600)
    }
  
    const cancelPress = () => {
      if (pressTimer) clearTimeout(pressTimer)
    }

    return (
        (new Date(todo.targetDays).getDate() == selectedDay 
            ||
    todo.frequency == "Daily" 
) 
            && <>
            <h1
            style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-color)',
                margin: 0,
                padding: 0,
                textAlign: 'left',
            }}
            >
                {new Date(todo.targetDays).getDate()} {months[new Date(todo.targetDays).getMonth()].slice(0, 3)} {new Date(todo.targetDays).getFullYear()}
            </h1>
            <div className="todo-item">
            
            <div
                className="todo-item-container"
                onMouseDown={() => startPress(todo.id)}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={() => startPress(todo.id)}
                onTouchEnd={cancelPress}
                onTouchCancel={cancelPress}
                >
                <div 
                    onClick={() => {
                        onToggle(todo.id, todo.text, todo.isCompleted)
                    }}
                style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    width: '90%',
                    gap: '1cap',
                }}
                className="todo-item-checkbox-container">

                
                <button
                    className={`${todo.isCompleted ? 'todo-item-checkbox-button-checked' : 'todo-item-checkbox-button'}`}
                >
                    {todo.isCompleted &&
                        <div className="todo-item-checkbox-button-checked-icon">
                            <svg
                            
                            style={{
                                color: todo.isCompleted ? 'var(--secondary-color)' : 'var(--text-color)',
                            }}
                            width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">

                                <polyline points="20 6 10 18 4 12" />
                            </svg>
                        </div>
                    }
                </button>
                <p
                    style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                    className="todo-item-text"
                >
                    {todo.text}
                </p>
                {(!selectedTag && todo.tag != "All" ) && <div className="todo-item-tag-container">
                    <p 
                        
                        style={{
                            // color: 'var(--text-color-secondary)',
                            display: 'inline-block',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                         className="todo-item-tag">{ todo.tag}</p>
                </div>}
                {/* { <div className="todo-item-tag-container">
                    <p 
                        
                        style={{
                            // color: 'var(--text-color-secondary)',
                            display: 'inline-block',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        className="todo-item-tag">{new Date(todo.targetDays).toISOString().split('T')[0]}</p>
                </div>} */}

                {/* {todo.frequency && <div className="todo-item-frequency-container">
                    <p className="todo-item-frequency">{todo.frequency}</p>
                </div>}

                {todo.targetDays && <div className="todo-item-target-days-container">
                    <p className="todo-item-target-days">{new Date(todo.targetDays).toISOString().split('T')[0]}</p>
                </div>}

                {todo.customInterval && <div className="todo-item-custom-interval-container">
                    <p className="todo-item-custom-interval">{todo.customInterval}</p>
                </div>} */}

               <div className="todo-item-streak-container"
               style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                gap: '1cap',
                width: '10cap',
               }}
               >
                    {/* <span className="habit-streak">   

                        {
                            
                            new Date(todo.targetDays).toISOString().split('T')[0].includes(new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0])
                            
                            ?
                            <p className="todo-item-streak-today">Today</p>
                            :
                            <p className="todo-item-streak-not-today">Not Today {new Date(todo.targetDays).toISOString().split('T')[0]}</p>
                        }
                    </span> */}
                {todo.streak > 0 && <div className="todo-item-streak">
                    <span 
                        className="habit-streak">  {todo.streak} 🔥  

                        {/* {
                            viewYear
                            +" "+
                            viewMonth  + " " + selectedDay
                        } */}
                    </span>
                </div>
                }
                </div>


                {/* {todo.longestStreak && <div className="todo-item-longest-streak-container">
                    <p className="todo-item-longest-streak">{todo.longestStreak}</p>
                </div>} */}

                </div>
                <div
                
                style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    width: '10%',
                }}
                >

                <button className="todo-item-button" onClick={() => {
                    if (typeof window !== "undefined") {
                        const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
                        if (!confirmDelete) return;
                    }
                    onDelete(todo.id)
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default TodoItem