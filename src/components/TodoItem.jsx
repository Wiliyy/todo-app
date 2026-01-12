// src/components/TodoItem.jsx
import '../styles/TodoItem.css'
import { useEffect, useState } from 'react'
import CalendarTable from './CalendarTable'
import SelectDrobDown from './SelectDrobDown'
import DayOfthWeek from './DayOfthWeek'
import TagsButtons from './TagsButtons'
import { daysOfWeek } from '../Logic/DaysOfTheWeek'
import { isAfterToday } from '../Logic/previosDate'

function TodoItem({ selectedType , setSelectedType, isCalendarVisible, setIsCalendarVisible, selectedTag, todo, onToggle, onDelete, onEdit, isEditing, onSaveEdit, onCancelEdit, handleTypeChange , viewMonth, viewYear, selectedDay ,setSelectedDay, setViewMonth, setViewYear, filteredTodos, isFormEditingVisible, setIsFormEditingVisible, isFormVisible , isRepeatTypeVisible, setIsRepeatTypeVisible , dayIndex, setDayIndex , index , selectedDays, setSelectedDays , addTag, onDeleteTag, onUpdateTag, tags ,todos , handleTaskCount , error, setError , input, setInput, getCount, completedTodos, currentFilter, onTagChange, updateHabitTag , handleTagChange  }) {
  if (!todo) return null
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  // const days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']
  let weekDays 
  
  
  useEffect(() => {
      // daysOfWeek

      // console.log(daysOfWeek)
      // console.log("daysOfWeek")
      // console.log(daysOfWeek)
      if (!daysOfWeek) {
        return 
      }
      weekDays = daysOfWeek
    }, [])

    const handleSelectDate = (day) => {
      if (isAfterToday(day, viewYear, viewMonth ) ) {
          return true
      }
      return false
  }


  const handleColorDate = (index) => {
      if ((!isFormEditingVisible && !isFormVisible) && index +1 == selectedDay) {
          return true
      }
      if ((!isAfterToday(index + 1, viewYear, viewMonth) && selectedDay == index + 1)) {
          return true
      }
      return false
  }

    const [RepeatType, setRepeatType] = useState([
      {
          label: 'No Repeat',
          value: 'No Repeat',
          selected: true
      },
      {
          label: 'Daily',
          value: 'Daily',
          selected: false
      },
    {
        label: 'every 2 days',
        value: 'every 2 days',
        selected: false
    },
    {
        label: 'every 3 days',
        value: 'every 3 days',
        selected: false
    },
      {
          label: 'Weekly',
          value: 'Weekly',
          selected: false
      },
      {
          label: 'Monthly',
          value: 'Monthly',
          selected: false
      },
      {
          label: 'Yearly',
          value: 'Yearly',
          selected: false
      },
      {
          label: 'Custom',
          value: 'Custom',
          selected: false
      }
  ])


  useEffect(() => {
    setRepeatType(RepeatType.map((type) => {
      if (type.value === todo.frequency) {
          return { ...type, selected: true }
      }
      return { ...type, selected: false }
  }))
  // console.log(todo.dayIndex)
  // console.log(selectedDays)
  // console.log("dayIndex")
  if (todo.dayIndex) {
    setSelectedDays(todo.dayIndex)
  }
  }, [])
    const [updateTargetDays , setUpdateTargetDays] = useState(new Date(todo.targetDays))


    const [updateFrequency , setUpdateFrequency] = useState(todo.frequency)


    useEffect(() => {
      // setSelectedType(RepeatType.find(type => type.selected)?.value)
      setUpdateFrequency(RepeatType.find(type => type.selected)?.value)
    }, [RepeatType])
    const handleUpdateTargetDays = () => {
        const updatedTargetDays = new Date(viewYear, viewMonth, selectedDay)
        setUpdateTargetDays(updatedTargetDays)
    }
    const handleUpdateFrequency = (e) => {
        setUpdateFrequency(e.target.value)
    }

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
  
        if (editText.trim()) {
            onSaveEdit(todo.id,
               editText.trim() ,
                new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0], 
                updateFrequency ,
                 selectedDays,
                selectedTag ? selectedTag.label : ''
                )
        }
    }

    if (isEditing) {
        return (
            <div className="todo-form">
              <TagsButtons
                addTag={addTag}
                isCalendarVisible={isCalendarVisible}
                setIsCalendarVisible={setIsCalendarVisible}
                filteredTodos={filteredTodos}
                viewMonth={viewMonth}
                setViewMonth={setViewMonth}
                viewYear={viewYear}
                setViewYear={setViewYear}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                todos={todos}
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
                selectedTag={selectedTag}
                handleTaskCount={handleTaskCount}
                tags={tags}
                error={error} setError={setError}
                isFormVisible={isFormVisible}
                input={input} setInput={setInput}
                getCount={getCount}
                completedTodos={completedTodos}
                currentFilter={currentFilter}
                onTagChange={onTagChange}
                updateHabitTag={updateHabitTag}
                isFormEditingVisible={isFormEditingVisible}
                todoTag={todo?.tag}
                />
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
                  // flexDirection:window.innerWidth > 768 ? 'row' : 'column-reverse',
                  flexDirection: 'column-reverse',
                  // alignItems: 'center',
                  // justifyContent: 'space-between',
                  gap: '1cap',
                  width: '100%',
                  // border: '1px solid var(--button-color)',
                }}>
                  
                  <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    gap: '1cap',
                    // width: '100%',
                    // width: window.innerWidth > 768 ? '50%' : '100%',
                  }}
                  >

                  
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
                    setIsRepeatTypeVisible(true)
                    // setIsCalendarVisible(!isCalendarVisible)
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
                      
                    {RepeatType.find(type => type.selected)?.label}  
                     </p>
                    <p>
                      <RepeatIcon color={'var(--text-color-secondary)'} />
                    </p>
                  </div>
                  {isRepeatTypeVisible && <SelectDrobDown
                  onClick={() => {
                    setIsRepeatTypeVisible(!isRepeatTypeVisible)
                  }}
                  RepeatType={RepeatType}
                  setRepeatType={setRepeatType}
                  />}
                  <button
                  style={{
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                  className="todo-item-button" onClick={() => {
                    if (typeof window !== "undefined") {
                        const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
                        if (!confirmDelete) return;
                    }
                    onDelete(todo.id)
                    onCancelEdit()
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
                  </div>
                  {
                    RepeatType.find(type => type.selected)?.value === 'Custom' && 
                    <div
                  style={{
                    // position: 'absolute',
                    // top: 0,
                    // left: 0,
                    width: '50%',
                    // backgroundColor: 'var(--button-color-checked)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // gap: '.4cap',
                    width: '100%',
                    overflowX: 'scroll',
                  }}
                  >

                  <DayOfthWeek
                  selectedDays={selectedDays}
                  setSelectedDays={setSelectedDays}
                  daysOfWeek={weekDays} />
                  </div>}
                  
                  
                </div>
                :
                <>
                <CalendarTable
                handleCalendarClick={() => {
                  
                  setIsCalendarVisible(!isCalendarVisible)
                }}
                viewMonth={viewMonth}
                setViewMonth={setViewMonth}
                viewYear={viewYear}
                setViewYear={setViewYear}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                filteredTodos={filteredTodos}
                months={months}
                isFormEditingVisible={isFormEditingVisible}
                isFormVisible={isFormVisible}
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

    const handleDaysOfTheWeek = () => {
      try {
        if (todo != null && todo != undefined && todo != '') {
          let selectedDayIndex = new Date(viewYear, viewMonth, selectedDay).getDay()
          if (todo.dayIndex != null && todo.dayIndex != undefined && todo.dayIndex != '') {
            return todo.dayIndex.includes(selectedDayIndex)
          }
        }
        return false
          
      } catch (error) {
        return false
      }
    }
    return ( <>
            {/* <h1
            style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-color)',
                margin: 0,
                padding: 0,
                textAlign: 'left',
            }}
            >
                {new Date(todo.targetDays).getDate()} {months[new Date(todo.targetDays).getMonth()].slice(0, 3)} {new Date(todo.targetDays).getFullYear()}
            </h1> */}
            <div 
            style={{
              opacity: handleSelectDate(selectedDay + 1) ? 0.5 : 1,
              // cursor: handleSelectDate(selectedDay + 1) ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (handleSelectDate(selectedDay + 1)) {
                return false
              }
              else {
                onToggle(todo.id, new Date(viewYear, viewMonth, selectedDay + 1))
              }
            }}
            
            className="todo-item">
            
            <div
                className="todo-item-container"
                // onMouseDown={() => startPress(todo.id)}
                // onMouseUp={cancelPress}
                // onMouseLeave={cancelPress}
                // onTouchStart={() => startPress(todo.id)}
                // onTouchEnd={cancelPress}
                // onTouchCancel={cancelPress}
                >
                <div 
                    // onClick={() => {
                    //   console.log('onToggle', todo.id, new Date(viewYear, viewMonth, selectedDay + 1))
                    //     onToggle(todo.id, new Date(viewYear, viewMonth, selectedDay + 1))
                    // }}
                style={{
                    display:'flex',
                    flexDirection:'column',
                    // alignItems:'center',
                    justifyContent:'space-between',
                    width: '90%',
                    gap: '1cap',
                    height: '100%',
                  }}
                  className="todo-item-checkbox-container">
          <div
          style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'start',
            justifyContent:'start',
            gap: '1cap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            alignItems: 'center',
          }}
          >

                <p
                    style={{ textDecoration:
                      todo.completions.includes(new Date(viewYear, viewMonth, selectedDay + 1).toISOString().split('T')[0]) 
                      ? 'line-through' : 'none' }}
                      className="todo-item-text"
                      >
                    {todo.text}
                </p>
          </div>
                 
<div style={{
  display:'flex',
  flexDirection:'row-reverse',
  alignItems:'center',
  justifyContent:'start',
  gap: '1cap',
  width: '100%',
}}>


               <div className="todo-item-streak-container"
               style={{
}}
               >
                {todo.streak > 0 && <div 
                
                style={{
                  textAlign:'left',
                  width: '100%',
                  margin: 0,
                  padding: 0,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-color)',
                  display:'flex',
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center',
                  gap: '1cap',
                  width: '100%',
                }}
                className="todo-item-streak">
                    <span 
                        className="habit-streak">  {todo.streak} 🔥  
                    </span>
                </div>
                }
                </div>
                {!selectedTag && (todo.tag != "All" && todo.tag != null && todo.tag != "") && <div
                 className={!selectedTag && (todo.tag != "All" && todo.tag != null && todo.tag != "")?
                  "todo-item-tag-container"
                  :
                  "hidden-todo-item-tag-container"
                }
                 >
                    <p 
                        
                        style={{
                            display: 'inline-block',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                         className="todo-item-tag">
                          {!isFormEditingVisible && todo.tag}
                          
                          </p>
                </div>}
                <div
                
                style={{
                  // display:'flex',
                  // flexDirection:'row',
                  // alignItems:'center',
                  // justifyContent:'center',
                  // gap: '1cap',
                  // width: '100%',
                }}
                > 
                  <p
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--text-color)',
                    margin: 0,
                    padding: 0,
                    textAlign: 'left',
                  }}
                  >
                    {new Date(todo.targetDays).getDate()} {months[new Date(todo.targetDays).getMonth()].slice(0, 3)} {new Date(todo.targetDays).getFullYear()}
                  </p>
                </div>
                </div>
                </div>
                <div
                
                style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'end',
                    justifyContent:'space-between',
                    width: '10%',
                    height: '100%',
                      width: '100%',
                }}
                >
<div

style={{
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'space-between',
  gap: '1cap',
  // width: '100%',
  // justifyContent:'end',
  height: '100%',
}}
>

{ !handleSelectDate(selectedDay + 1) && 
<button
                    className={`${todo.completions.includes(new Date(viewYear, viewMonth, selectedDay + 1).toISOString().split('T')[0]) ? 'todo-item-checkbox-button-checked' : 'todo-item-checkbox-button'}`}
                    >
                    {todo?.completions?.includes(new Date(viewYear, viewMonth, selectedDay + 1).toISOString().split('T')[0]) &&
                        <div className="todo-item-checkbox-button-checked-icon">
                            <svg
                            
                            style={{
                              color: 
                              todo?.completions?.includes(new Date(viewYear, viewMonth, selectedDay + 1).toISOString().split('T')[0]) 
                              ?
                              'var(--secondary-color)' : 'var(--text-color)',
                            }}
                            width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">

                                <polyline points="20 6 10 18 4 12" />
                            </svg>
                        </div>
                    }
                </button>

              }
                <button 
                className="todo-item-button" onClick={() => {
                  onEdit(todo.id)
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="5" cy="12" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="19" cy="12" r="2"></circle>
                    </svg>
                </button>
                  </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default TodoItem