import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";

const SharedTodoView = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedTodo = async () => {
      try {
        // In a real implementation, this would fetch from an API
        // For demo purposes, we'll get it from localStorage
        const todos = JSON.parse(localStorage.getItem("taskshare_todos") || "[]");
        const sharedTodos = JSON.parse(localStorage.getItem("taskshare_shared_todos") || "[]");
        
        const sharedInfo = sharedTodos.find(shared => shared.shareCode === todoId);
        if (!sharedInfo) {
          throw new Error("Shared todo not found");
        }

        const foundTodo = todos.find(t => t.id === sharedInfo.todoId);
        if (!foundTodo) {
          throw new Error("Todo not found");
        }

        setTodo(foundTodo);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSharedTodo();
  }, [todoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M96.44,156c2.54,11.35,15.7,20,31.56,20,17.67,0,32-10.75,32-24,0-32-62.22-20-62.22-48,0-13.25,12.55-24,30.22-24,13.25,0,23.63,6,28,14.66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M214,146.69A48,48,0,0,1,146.69,214,88.07,88.07,0,0,1,42,109.31,48,48,0,0,1,109.31,42,88.07,88.07,0,0,1,214,146.69Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-2">Go Home</span>
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(256 0) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="120 96 88 128 120 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Shared Task</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Shared View
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-md border-2 
                ${todo.completed 
                  ? "bg-green-500 border-green-500" 
                  : "border-gray-300"}`}
              >
                {todo.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 176 127.99 136 64 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                )}
              </div>

              <div className="flex-1">
                <h2 className={`text-xl font-medium ${
                  todo.completed ? "text-gray-500 line-through" : "text-gray-900"
                }`}>
                  {todo.title}
                </h2>

                {todo.description && (
                  <p className="mt-2 text-gray-600">{todo.description}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {todo.priority && todo.priority !== "none" && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${todo.priority === "high" ? "bg-red-100 text-red-800" :
                        todo.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"}`}>
                      {todo.priority} priority
                    </span>
                  )}

                  {todo.dueDate && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Due {format(new Date(todo.dueDate), "MMM d, yyyy")}
                    </span>
                  )}

                  {todo.completed && todo.completedAt && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed {format(new Date(todo.completedAt), "MMM d, yyyy")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <div className="text-sm text-gray-500 flex items-center justify-between">
              <span>Created {format(new Date(todo.createdAt), "MMM d, yyyy")}</span>
              <button
                onClick={() => window.location.href = "/"}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">Create Your Own Tasks</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SharedTodoView;