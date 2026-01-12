// src/services/TodoFilterService.js
export class TodoFilterService {
    constructor() {
      this.filters = {
        all: () => true,
        active: (todo) => !todo.completions.includes(new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0]),
        completed: (todo) => todo.isCompleted
      }
    }
  
     handleRenderTagSelection = (todo , selectedTag) => {
        return (!selectedTag || todo.tag === selectedTag.label)
    }
  
     handleRenderFrequency = (todo , current_selected_day , viewYear, viewMonth, selectedDay , selectedTag ) => {
      // let 
      if (todo.frequency == "Daily" || this.handleRenderTagSelection(todo , selectedTag)) {
       return false
      }
      if (todo.frequency == "No Repeat" && this.handleRenderTagSelection(todo , selectedTag)) {
        // console.log(todo.targetDays.includes( new Date(viewYear, viewMonth, selectedDay)
        // ))
        // console.log(current_selected_day)
        // console.log( new Date(todo.targetDays).toISOString().split('T')[0])
        // console.log(new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0])
  
        if (new Date(todo.targetDays).toISOString().split('T')[0] == new Date(viewYear, viewMonth, selectedDay).toISOString().split('T')[0]
        ) {
          return false
        } 
        return true
      } 
  
      if (todo.frequency == "Custom" && this.handleRenderTagSelection(todo , selectedTag)) {
        if(todo.dayIndex != null && todo.dayIndex != undefined && todo.dayIndex != ''){          
          if (todo.dayIndex.includes(current_selected_day)) {
            return false
          }
        }
      }
      if (todo.frequency == "Weekly" && this.handleRenderTagSelection(todo , selectedTag)) {
        if(todo.dayIndex != null && todo.dayIndex != undefined && todo.dayIndex != ''){          
            let target_day = new Date(todo.createdAt).getDay()
            if (target_day == current_selected_day) {
              return false
            }
        }
      }
      return true 
    }
  
     handleRenderDaysOfTheWeek = (todo , viewYear, viewMonth, selectedDay , selectedTag) => {
      let current_selected_day = new Date(viewYear, viewMonth, selectedDay).getDay()
      if (this.handleRenderFrequency(todo , current_selected_day , viewYear, viewMonth, selectedDay , selectedTag)) {
        return false
      } 
  
  
      if (this.handleRenderTagSelection(todo , selectedTag)) {
        return true
      } 
  
  
      if (todo.frequency == "No Repeat" && this.handleRenderTagSelection(todo , selectedTag)) {
        return true
      } 
       if (todo.frequency == "Daily" && this.handleRenderTagSelection(todo , selectedTag)) {
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



    filter(todos, filterType) {
      const filterFn = this.filters[filterType] || this.filters.all
      return todos.filter(filterFn)
    }
 
    getCount(todos, filterType, selectedTag, viewMonth, viewYear, selectedDay ) {
        // console.log('getCount', todos, filterType, selectedTag)


        let todayTodo = []
        // todayTodo = todos.filter(todo => new Date(todo.targetDays).getDate() == selectedDay && new Date(todo.targetDays).getMonth() == viewMonth && new Date(todo.targetDays).getFullYear() == viewYear)
        todayTodo = todos.filter(todo => this.handleRenderDaysOfTheWeek(todo , viewYear, viewMonth, selectedDay , selectedTag))
        let count = 0
  //   console.log('todayTodo', todayTodo)
  // console.log('count', count)
  // console.log('filterType', filterType)
  // console.log('selectedTag', selectedTag)
  // console.log('viewMonth', viewMonth)
  // console.log('viewYear', viewYear)
  // console.log('selectedDay', selectedDay)
  // console.log('todos', todos)
        
            if (filterType === 'active' ) {
                // count += todayTodo.length
                count += todayTodo.filter(todo => (todo.isCompleted == false && (!selectedTag || todo.tag === selectedTag?.label)) ).length
            } else if (filterType === 'completed') {
                count += todayTodo.filter(todo => (todo.isCompleted == true && (!selectedTag || todo.tag === selectedTag?.label)) ).length
              }
              else if (filterType === 'all') {
              count += todayTodo.length
            }
        
        return count 
      }
      
    // Extensible: Add new filter without modifying existing code
    addFilter(name, filterFn) {
      this.filters[name] = filterFn
    }
  }