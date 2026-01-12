// src/components/TodoList.jsx (New - Separated List Logic)
import { useEffect, useMemo } from 'react'
import TodoItem from './TodoItem'
import HabitItem from './HabitItem'

function HabitList({ selectedType , setSelectedType, isCalendarVisible, setIsCalendarVisible, selectedTag, filteredTodos , handleTypeChange , todos, onToggle, onDelete, onUpdate, editingId, setEditingId, viewMonth, viewYear, selectedDay , setSelectedDay, setViewMonth, setViewYear, isFormEditingVisible, setIsFormEditingVisible, isFormVisible , isRepeatTypeVisible, setIsRepeatTypeVisible , dayIndex, setDayIndex , selectedDays, setSelectedDays , addTag, onDeleteTag, onUpdateTag, tags , handleTaskCount , error, setError , handleTagChange , input, setInput}) {
  const handleEdit = (id) => {
    setIsFormEditingVisible(true)
    setEditingId(id)
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  
  const handleSaveEdit = (id, newText, updateTargetDays, updateFrequency, selectedDays, selectedTag) => {
    let targetDate = new Date(viewYear, viewMonth, selectedDay).toISOString()
    console.log('handleSaveEdit', id, newText, targetDate, updateFrequency, selectedDays, selectedTag)
    onUpdate(id, newText, targetDate, updateFrequency, selectedDays, selectedTag)
    setEditingId(null)
    setIsFormEditingVisible(false)
  }
  const handleCancelEdit = () => {
    setEditingId(null)
    setIsFormEditingVisible(false)
    setUpdateFrequency(todo.frequency)
  }

  if (todos.length === 0) {
    return 
  }

  const handleRenderTagSelection = (todo) => {
    if (isFormEditingVisible) {
      return true
    }else{
      return (!selectedTag || todo.tag === selectedTag.label)
    }
  }

  const handleRenderFrequency = (todo , current_selected_day) => {
    if (isFormEditingVisible) {
      return false
    }
    // let 
    if (todo.frequency == "Daily" && handleRenderTagSelection(todo)) {
     return false
    }
    if (todo.frequency == "No Repeat" && handleRenderTagSelection(todo)) {
      if (new Date(todo.targetDays).toISOString().split('T')[0] == new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0]
      ) {
        return false
      } 
      return true
    } 

    if (todo.frequency == "Custom" && handleRenderTagSelection(todo)) {
      try {
        if(todo.dayIndex != null && todo.dayIndex != undefined && todo.dayIndex != ''){          
  
          if (todo.dayIndex.includes(current_selected_day)) {
            return false
          }
        }
        
      } catch (error) {
        return true
      }
    }
    if (todo.frequency === "every 2 days" && handleRenderTagSelection(todo)) {
      const checkDate = new Date(viewYear, viewMonth, selectedDay);
      const created = new Date(todo.createdAt);
      checkDate.setHours(0, 0, 0, 0);
      created.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((checkDate - created) / (1000 * 60 * 60 * 24));
      return daysDiff % 2 !== 0; // Return true to HIDE
  }
    if (todo.frequency === "every 3 days" && handleRenderTagSelection(todo)) {
      const checkDate = new Date(viewYear, viewMonth, selectedDay);
      const created = new Date(todo.createdAt);
      checkDate.setHours(0, 0, 0, 0);
      created.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((checkDate - created) / (1000 * 60 * 60 * 24));
      return daysDiff % 3 !== 0; // Return true to HIDE
  }
    if (todo.frequency == "Weekly" && handleRenderTagSelection(todo)) {
      if(todo.dayIndex != null && todo.dayIndex != undefined && todo.dayIndex != ''){          

        let target_day = new Date(todo.createdAt).getDay()
        if (target_day == current_selected_day) {
          return false
        }
      }
    }
    return true 
  }

  const handleRenderDaysOfTheWeek = (todo) => {
    let current_selected_day = new Date(viewYear, viewMonth, selectedDay).getDay()
    if (handleRenderFrequency(todo , current_selected_day)) {
      return false
    } 


    if (handleRenderTagSelection(todo)) {
      return true
    } 


    if (todo.frequency == "No Repeat" && handleRenderTagSelection(todo)) {
      return true
    } 
     if (todo.frequency == "Daily" && handleRenderTagSelection(todo)) {
      return true
    }
    try {
      if (todo != null && todo != undefined && todo != '') {
        let selectedDayIndex = new Date(viewYear, viewMonth, selectedDay).getDay()
        if (todo.dayIndex != null && todo.dayIndex != undefined && todo.dayIndex != '') {
          return todo.dayIndex.includes(current_selected_day)
        }
      }
      return false
        
    } catch (error) {
      return false
    }
  }

  



  // New render logic: render all tags if the selectedTag/todo.tag match fails
  const renderTodos = () => {
      return filteredTodos.map((todo, index) => {
          if (
            handleRenderDaysOfTheWeek(todo) 
        ) {
          return (
            <>
            <TodoItem
            index={index}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setSelectedDay={setSelectedDay}
            setViewMonth={setViewMonth}
            setViewYear={setViewYear}
            isCalendarVisible={isCalendarVisible}
            setIsCalendarVisible={setIsCalendarVisible}
            selectedTag={selectedTag}
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            isEditing={editingId === todo.id}
            handleTypeChange={handleTypeChange}
            viewMonth={viewMonth}
            viewYear={viewYear}
            selectedDay={selectedDay}
            filteredTodos={filteredTodos}
            isFormEditingVisible={isFormEditingVisible}
            setIsFormEditingVisible={setIsFormEditingVisible}
            isFormVisible={isFormVisible}
            isRepeatTypeVisible={isRepeatTypeVisible}
            setIsRepeatTypeVisible={setIsRepeatTypeVisible}
            dayIndex={dayIndex}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            addTag={addTag}
            onDeleteTag={onDeleteTag}
            onUpdateTag={onUpdateTag}
            tags={tags}
            todos={todos}
            handleTaskCount={handleTaskCount}
            error={error}
            setError={setError}
            onTagChange={handleTagChange}
            input={input}
            setInput={setInput}
            />
            </>
            );
        }
    return null;
      });
    return null;
  }

     const dueToday = filteredTodos.filter(h => {
        const today = new Date().getDay()
        if (h?.frequency === 'daily') return true
        if (h?.frequency === 'weekly') return h?.targetDays?.includes(today)
        return true
    })
  return (
    <div className='todos-container'>

        {
        renderTodos()  
        }
      {/* { (renderTodos() != null && renderTodos()[0] != null)  ? renderTodos() : 
      <>    
      <p
      style={{
          textAlign:"center",
          fontSize:"16px",
          fontWeight:"600",
          color: 'var(--text-color)',
          textTransform:"capitalize",
          fontFamily:"system-ui, Avenir, Helvetica, Arial, sans-serif",
          }}
          >No habits for today 
      
      </p>
      <p
      style={{
          textAlign:"center",
          fontSize:"14px",
          fontWeight:"600",
          color: 'var(--text-color)',
          fontFamily:"system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}>add some to your calendar</p>
      </>
      
      } */}
      {/* <div className="habit-list">
            {dueToday.map(habit => (
                <HabitItem 
                    key={habit?.id}
                    habit={habit}
                    onToggle={onToggle}
                />
            ))
        }
        </div> */}
    </div>
  )
}

export default HabitList