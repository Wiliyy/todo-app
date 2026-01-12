// src/components/TodoList.jsx (New - Separated List Logic)
import { useEffect, useMemo } from 'react'
import TodoItem from './TodoItem'
import HabitItem from './HabitItem'

function HabitList({ selectedType , setSelectedType, isCalendarVisible, setIsCalendarVisible, selectedTag, filteredTodos , handleTypeChange , todos, onToggle, onDelete, onUpdate, editingId, setEditingId, viewMonth, viewYear, selectedDay , setSelectedDay, setViewMonth, setViewYear, isFormEditingVisible, setIsFormEditingVisible }) {
  const handleEdit = (id) => {
    setIsFormEditingVisible(true)
    setEditingId(id)
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  
  const handleSaveEdit = (id, newText, updateTargetDays, updateFrequency) => {
    console.log('handleSaveEdit in HabitList', id, newText, updateTargetDays, updateFrequency)
    onUpdate(id, newText, updateTargetDays, updateFrequency)
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

  // New render logic: render all tags if the selectedTag/todo.tag match fails
  const renderTodos = () => {
    // console.log("filter", filter)
    // if (filter.selected) {
      // If a selectedTag is present, render only todos for that tag; else, render all
      
        
      
      
      return filteredTodos.map((todo) => {
        if (
            true
// isFormEditingVisible 
// && (
            // new Date(todo.targetDays).toISOString().split('T')[0].includes(new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0])
//                 ||
//                 todo.frequency == "Daily"
//             )
        ) {
        if (!selectedTag || todo.tag === selectedTag.id) {
          // No selectedTag: show all todos
          return (
            <>
            
            <TodoItem
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
            />
            </>
            );
        }
        //  else if (todo.tag === selectedTag.id ) {
        //     // selectedTag present and matches todo.tag
        //     return (
        //         <TodoItem
        //         selectedType={selectedType}
        //         setSelectedType={setSelectedType}
        //         setSelectedDay={setSelectedDay}
        //         setViewMonth={setViewMonth}
        //         setViewYear={setViewYear}
        //         isCalendarVisible={isCalendarVisible}
        //         setIsCalendarVisible={setIsCalendarVisible}
        //         selectedTag={selectedTag}
        //         key={todo.id}
        //         todo={todo}
        //         onToggle={onToggle}
        //         onDelete={onDelete}
        //         onEdit={handleEdit}
        //         onSaveEdit={handleSaveEdit}
        //         onCancelEdit={handleCancelEdit}
        //         isEditing={editingId === todo.id}
        //         handleTypeChange={handleTypeChange}
        //         viewMonth={viewMonth}
        //         viewYear={viewYear}
        //         selectedDay={selectedDay}
        //         filteredTodos={filteredTodos}
        //         isFormEditingVisible={isFormEditingVisible}
        //         setIsFormEditingVisible={setIsFormEditingVisible}
        //     />
        //   );
        // }

    }
        // If selectedTag present, but not matching, don't render
        return null;
      });
    // }
    return null;
  }
  
//   handleFilter = (h) => {
//     if (filter.selected) {
//         if (h.tag === selectedTag.id) {
//             return true
//         } else {
//             return false
//         }
//     }
//     return false
//   }
     
useEffect(() => {
//   console.log('renderTodos')
//   console.log(renderTodos())
//   console.log(renderTodos().length)

}, [renderTodos])

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