import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TodoContext } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const { filterTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
    sortBy: "dateCreated"
  });
  const [searchText, setSearchText] = useState("");

  const filteredTodos = filterTodos({
    ...filter,
    searchText
  });

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { key: "all", label: "All Priorities" },
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" }
  ];

  const sortOptions = [
    { key: "dateCreated", label: "Date Created" },
    { key: "dueDate", label: "Due Date" },
    { key: "priority", label: "Priority" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <AddTodo />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </span>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              {filterOptions.map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              {priorityOptions.map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filter.sortBy}
              onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.key} value={option.key}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64"><rect width="256" height="256" fill="none"/><path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500">
              {searchText
                ? "Try adjusting your search or filters"
                : "Start by adding a new task"}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Stats Footer */}
      {filteredTodos.length > 0 && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div>
            {filteredTodos.length} task{filteredTodos.length !== 1 && "s"} 
            {filter.status !== "all" && ` (${filter.status})`}
          </div>
          <div>
            {filteredTodos.filter(todo => todo.completed).length} completed
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;