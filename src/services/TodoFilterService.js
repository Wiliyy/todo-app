// src/services/TodoFilterService.js
export class TodoFilterService {
    constructor() {
      // Open/Closed: Easy to extend with new filters
      this.filters = {
        all: () => true,
        active: (todo) => !todo.isCompleted,
        completed: (todo) => todo.isCompleted
      }
    }
  
    filter(todos, filterType) {
      const filterFn = this.filters[filterType] || this.filters.all
      return todos.filter(filterFn)
    }
 
    getCount(todos, filterType, selectedTag) {
        let count = 0
        // if (selectedTag) {
        //     count = todos.filter(todo => todo.tag === selectedTag.id).length
        // }
            if (filterType === 'active' ) {
                count += todos.filter(todo => (!todo.isCompleted) && (selectedTag ? todo.tag === selectedTag.id : true)).length
            } else if (filterType === 'completed') {
                count += todos.filter(todo => todo.isCompleted && (selectedTag ? todo.tag === selectedTag.id : true)).length
            }
        return count
      }
      
    // Extensible: Add new filter without modifying existing code
    addFilter(name, filterFn) {
      this.filters[name] = filterFn
    }
  }