import React, { useEffect, useState } from 'react'
import '../styles/TodoForm.css'
import CalenderCard from './CalenderCard'
import Calendar from './Calendar'
import CalendarTable from './CalendarTable'
import { RepeatIcon } from './RepeatIcon'
import SelectDrobDown from './SelectDrobDown'
import DayOfthWeek from './DayOfthWeek'
import { daysOfWeek } from '../Logic/DaysOfTheWeek'
import TagsButtons from './TagsButtons'

function TodoForm({
  addTag,
  onDeleteTag,
  onUpdateTag,
  selectedTag,
  handleTaskCount,
  tags,
  error,
  setError,
  handleAppClick ,
  isFormVisible,
  input,
  setInput,
  handleSubmit,
  selectedType,
  setSelectedType,
  isCalendarVisible,
  setIsCalendarVisible,   
  filteredTodos,
  viewMonth,
  setViewMonth,
  viewYear,
  setViewYear,
  selectedDay,
  setSelectedDay ,
  isRepeatTypeVisible,
  setIsRepeatTypeVisible ,
  dayIndex,
  setDayIndex ,
  selectedDays,
  setSelectedDays,
  completedTodos,
  currentFilter,
  onTagChange,
  updateHabitTag,
  todos,
  getCount,
  isFormEditingVisible,
  todoTag
}) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  // const days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']
  // const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  
  let daysOfWeek 


    useEffect(() => {
      if (!daysOfWeek) {
        return 
      }
      daysOfWeek = daysOfWeek
    }, [])
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
    // {
    //     label: 'Monthly',
    //     value: 'Monthly',
    //     selected: false
    // },
    // {
    //     label: 'Yearly',
    //     value: 'Yearly',
    //     selected: false
    // },
    {
        label: 'Custom',
        value: 'Custom',
        selected: false
    },
])

  // const handleSelectedTypeChange = (value) => {
  //   setSelectedType(value)
  // }

  useEffect(() => {
    setSelectedType(RepeatType.find(type => type.selected)?.value)
  }, [RepeatType])

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


  return (
    <form 
    style={{ display: isFormVisible ? 'flex' : 'none' }}
    className='todo-form-container' onSubmit={handleSubmit} onClick={(e) => {e.stopPropagation() , handleAppClick(e)}}>
      { isFormVisible && <div className='todo-form-container-inner' onClick={handleAppClick}>
          <div className="todo-form" 
          
          >
{/* <TagsButtons
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
                /> */}
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
                  days={daysOfWeek} />
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
        </div>
        }
    </form>
  )
}

export default TodoForm