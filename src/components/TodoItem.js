import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import ShareModal from "./ShareModal";
import { TodoContext } from "../contexts/TodoContext";
import { format } from "date-fns";

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
  none: "bg-gray-100 text-gray-800 border-gray-200"
};

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { updateTodo, deleteTodo } = useContext(TodoContext);

  const handleToggleComplete = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date().toISOString() : null
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() !== "") {
      updateTodo({
        ...todo,
        title: editedTitle,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleShareToggle = () => {
    setShareModalOpen(!shareModalOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={`group border-l-4 ${todo.completed ? "border-green-400" : "border-indigo-400"} 
                  mb-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <div className="p-4">
        <div className="flex items-start">
          {/* Checkbox */}
          <button
            onClick={handleToggleComplete}
            className={`flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       ${todo.completed 
                         ? "bg-green-500 border-green-500" 
                         : "border-gray-300 hover:border-indigo-500"}`}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            )}
          </button>

          {/* Todo Content */}
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-gray-800 border-b-2 border-indigo-300 focus:border-indigo-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <div>
                <p className={`text-base font-medium ${todo.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
                  {todo.title}
                </p>
                
                <div className="mt-1 flex items-center space-x-2 text-xs">
                  {todo.priority && todo.priority !== "none" && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border ${priorityColors[todo.priority]}`}>
                      {todo.priority}
                    </span>
                  )}
                  
                  {todo.dueDate && (
                    <span className="text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="16"/><circle cx="176" cy="128" r="16"/><circle cx="80" cy="176" r="16"/><circle cx="128" cy="176" r="16"/><circle cx="176" cy="176" r="16"/></svg>
                      <span className="ml-1">{format(new Date(todo.dueDate), "MMM d")}</span>
                    </span>
                  )}
                  
                  {todo.completedAt && (
                    <span className="text-green-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      <span className="ml-1">Completed {format(new Date(todo.completedAt), "MMM d")}</span>
                    </span>
                  )}
                </div>
                
                {todo.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {todo.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`ml-2 flex items-center space-x-1 ${isHovered ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"} transition-opacity`}>
            {!isEditing && (
              <>
                <button
                  onClick={handleEdit}
                  className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="152" y="40" width="64" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="88" x2="180" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="128" x2="180" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="168" x2="180" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M40,64,72,32l32,32V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="80" x2="40" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="176" x2="40" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
                <button
                  onClick={handleShareToggle}
                  className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Share task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polyline points="176 152 224 104 176 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 216 32 216 32 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M72,176a96,96,0,0,1,93-72h59" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="216" y1="60" x2="40" y2="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="20" x2="168" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        todo={todo} 
      />
    </motion.div>
  );
};

export default TodoItem;