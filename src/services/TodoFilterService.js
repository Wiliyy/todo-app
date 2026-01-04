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
  
    // Extensible: Add new filter without modifying existing code
    addFilter(name, filterFn) {
      this.filters[name] = filterFn
    }
  }