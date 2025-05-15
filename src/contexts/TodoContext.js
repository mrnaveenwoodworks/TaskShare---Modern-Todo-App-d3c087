import React, { createContext, useState, useEffect } from "react";
import useTodos from "../hooks/useTodos";

// Create the TodoContext
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // Use our custom todo hook to get all todo-related functionality
  const {
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
  } = useTodos();

  // Stats for the dashboard
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    shared: 0
  });

  // Update stats whenever todos change
  useEffect(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const active = todos.length - completed;
    const shared = getAllSharedTodos().length;
    
    setStats({
      total: todos.length,
      completed,
      active,
      shared
    });
  }, [todos, getAllSharedTodos]);

  // User preferences (could be expanded)
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem("taskshare_preferences");
    return savedPrefs ? JSON.parse(savedPrefs) : {
      theme: "light",
      sortOrder: "newest",
      defaultView: "all"
    };
  });

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("taskshare_preferences", JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Update a specific preference
  const updatePreference = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Export the context value
  const contextValue = {
    // Todo CRUD operations
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
    
    // Sharing functionality
    shareTodo,
    getSharedTodoByCode,
    getAllSharedTodos,
    unshareTask,
    
    // Filtering
    filterTodos,
    
    // Stats for dashboard
    stats,
    
    // User preferences
    userPreferences,
    updatePreference
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;