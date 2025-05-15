import React from "react";
import { Routes, Route } from "react-router-dom";
import { TodoProvider } from "./contexts/TodoContext";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import SharedTodoView from "./pages/SharedTodoView";

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="max-w-4xl mx-auto">
                  {/* Welcome Message */}
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      Welcome to TaskShare
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Stay organized and collaborate effortlessly. Create, manage, and share your tasks with others in a beautiful, intuitive interface.
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                      <div className="rounded-full bg-indigo-100 p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
                        <p className="text-2xl font-bold text-indigo-600">0</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                      <div className="rounded-full bg-green-100 p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                        <p className="text-2xl font-bold text-green-600">0</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                      <div className="rounded-full bg-purple-100 p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="149.09" y1="73.3" x2="90.91" y2="110.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="90.91" y1="145.3" x2="149.09" y2="182.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="64" cy="128" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="200" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="56" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Shared</h3>
                        <p className="text-2xl font-bold text-purple-600">0</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Todo List */}
                  <TodoList />
                </div>
              } 
            />
            
            <Route 
              path="/shared/:todoId" 
              element={<SharedTodoView />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-500 text-sm">
              <p>TaskShare &copy; {new Date().getFullYear()}</p>
              <p className="mt-1">
                Built with React and Tailwind CSS. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </TodoProvider>
  );
};

export default App;