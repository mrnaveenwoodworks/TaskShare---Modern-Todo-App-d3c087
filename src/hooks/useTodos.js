import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("taskshare_todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [sharedTodos, setSharedTodos] = useState(() => {
    const savedSharedTodos = localStorage.getItem("taskshare_shared_todos");
    return savedSharedTodos ? JSON.parse(savedSharedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskshare_todos", JSON.stringify(todos));
  }, [todos]);

  // Save shared todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskshare_shared_todos", JSON.stringify(sharedTodos));
  }, [sharedTodos]);

  // Add a new todo
  const addTodo = (todoData) => {
    const newTodo = {
      ...todoData,
      id: nanoid(),
      created: new Date().toISOString(),
      completed: false
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    return newTodo;
  };

  // Update an existing todo
  const updateTodo = (updatedTodo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (todoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    
    // Also remove from shared todos if it exists there
    setSharedTodos(prevSharedTodos => 
      prevSharedTodos.filter(sharedTodo => sharedTodo.todoId !== todoId)
    );
  };

  // Toggle todo completion status
  const toggleTodoComplete = (todoId) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null }
          : todo
      )
    );
  };

  // Share a todo - generates a share code and stores the share info
  const shareTodo = (todoId) => {
    // Find the todo
    const todoToShare = todos.find(todo => todo.id === todoId);
    if (!todoToShare) return null;

    // Generate a unique sharing code
    const shareCode = nanoid(10);
    
    // Create a shared todo record
    const sharedTodoRecord = {
      shareCode,
      todoId,
      originalTitle: todoToShare.title,
      sharedAt: new Date().toISOString()
    };
    
    setSharedTodos(prev => [...prev, sharedTodoRecord]);
    
    return shareCode;
  };

  // Get a shared todo by its share code
  const getSharedTodoByCode = (shareCode) => {
    const sharedRecord = sharedTodos.find(shared => shared.shareCode === shareCode);
    if (!sharedRecord) return null;
    
    const todo = todos.find(todo => todo.id === sharedRecord.todoId);
    if (!todo) return null;
    
    return {
      ...todo,
      isShared: true,
      sharedAt: sharedRecord.sharedAt
    };
  };

  // Get all todos that have been shared
  const getAllSharedTodos = () => {
    return todos.filter(todo => 
      sharedTodos.some(shared => shared.todoId === todo.id)
    ).map(todo => {
      const sharedRecord = sharedTodos.find(shared => shared.todoId === todo.id);
      return {
        ...todo,
        isShared: true,
        sharedAt: sharedRecord.sharedAt,
        shareCode: sharedRecord.shareCode
      };
    });
  };

  // Remove sharing for a todo
  const unshareTask = (todoId) => {
    setSharedTodos(prev => prev.filter(shared => shared.todoId !== todoId));
  };

  // Filter todos by various criteria
  const filterTodos = (filters = {}) => {
    let filteredList = [...todos];
    
    // Filter by completion status
    if (filters.status === "completed") {
      filteredList = filteredList.filter(todo => todo.completed);
    } else if (filters.status === "active") {
      filteredList = filteredList.filter(todo => !todo.completed);
    }
    
    // Filter by priority
    if (filters.priority && filters.priority !== "all") {
      filteredList = filteredList.filter(todo => todo.priority === filters.priority);
    }
    
    // Filter by due date
    if (filters.dueDateRange) {
      const { start, end } = filters.dueDateRange;
      if (start && end) {
        filteredList = filteredList.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          return dueDate >= start && dueDate <= end;
        });
      }
    }
    
    // Filter by search text
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filteredList = filteredList.filter(todo => 
        todo.title.toLowerCase().includes(searchLower) || 
        (todo.description && todo.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort todos
    if (filters.sortBy) {
      switch(filters.sortBy) {
        case "dateCreated":
          filteredList.sort((a, b) => new Date(b.created) - new Date(a.created));
          break;
        case "dueDate":
          filteredList.sort((a, b) => {
            // Todos without due dates go to the bottom
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
          });
          break;
        case "priority":
          const priorityOrder = { high: 1, medium: 2, low: 3, none: 4 };
          filteredList.sort((a, b) => {
            const aPriority = a.priority || "none";
            const bPriority = b.priority || "none";
            return priorityOrder[aPriority] - priorityOrder[bPriority];
          });
          break;
        default:
          break;
      }
    }
    
    return filteredList;
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
    shareTodo,
    getSharedTodoByCode,
    getAllSharedTodos,
    unshareTask,
    filterTodos
  };
};

export default useTodos;