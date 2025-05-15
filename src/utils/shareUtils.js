import { nanoid } from "nanoid";

/**
 * Generates a unique share code for a todo item
 * @returns {string} A unique share code
 */
export const generateShareCode = () => {
  return nanoid(10);
};

/**
 * Creates a shareable URL for a todo item
 * @param {string} shareCode - The unique share code for the todo
 * @returns {string} A shareable URL
 */
export const createShareableUrl = (shareCode) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/shared/${shareCode}`;
};

/**
 * Validates if a share code is in the correct format
 * @param {string} shareCode - The share code to validate
 * @returns {boolean} True if the share code is valid
 */
export const isValidShareCode = (shareCode) => {
  // Check if it's a string and has the correct length 
  // (assuming nanoid(10) was used to generate it)
  return typeof shareCode === "string" && shareCode.length === 10;
};

/**
 * Shares a todo item via email
 * @param {Object} todo - The todo object to share
 * @param {string} shareUrl - The shareable URL
 * @param {string} [email] - Optional email address to share with
 */
export const shareTodoViaEmail = (todo, shareUrl, email = "") => {
  const subject = encodeURIComponent(`Check out this task: ${todo.title}`);
  const body = encodeURIComponent(
    `Take a look at this task:\n\n${todo.title}\n\n${shareUrl}`
  );
  
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  window.open(mailtoLink);
};

/**
 * Generates a QR code data URL for a shareable link
 * @param {string} shareUrl - The shareable URL
 * @returns {Promise<string>} A promise that resolves to the QR code data URL
 */
export const generateQrCodeDataUrl = async (shareUrl) => {
  try {
    // In a real implementation, this would use a QR code library
    // For this demo, we'll return a placeholder URL
    return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxRUiUyQmNvZGUlMkJmb3IlMkJ0b2RvJTJCc2hhcmluZyUyQmxpbmt8ZW58MHx8fHwxNzQ3Mjg4MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080";
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};

/**
 * Stores share information in local storage
 * @param {string} todoId - The ID of the todo being shared
 * @param {string} shareCode - The generated share code
 */
export const storeShareInfo = (todoId, shareCode) => {
  try {
    // Get existing shared todos or initialize empty array
    const sharedTodos = JSON.parse(localStorage.getItem("taskshare_shared_todos")) || [];
    
    // Add new share info
    sharedTodos.push({
      todoId,
      shareCode,
      sharedAt: new Date().toISOString()
    });
    
    // Store updated array
    localStorage.setItem("taskshare_shared_todos", JSON.stringify(sharedTodos));
    
    return true;
  } catch (error) {
    console.error("Error storing share info:", error);
    return false;
  }
};

/**
 * Removes share information from local storage
 * @param {string} todoId - The ID of the todo to unshare
 */
export const removeShareInfo = (todoId) => {
  try {
    // Get existing shared todos
    const sharedTodos = JSON.parse(localStorage.getItem("taskshare_shared_todos")) || [];
    
    // Filter out the todo we want to unshare
    const updatedSharedTodos = sharedTodos.filter(
      (sharedTodo) => sharedTodo.todoId !== todoId
    );
    
    // Store updated array
    localStorage.setItem("taskshare_shared_todos", JSON.stringify(updatedSharedTodos));
    
    return true;
  } catch (error) {
    console.error("Error removing share info:", error);
    return false;
  }
};

/**
 * Gets the share code for a specific todo
 * @param {string} todoId - The ID of the todo
 * @returns {string|null} The share code or null if not found
 */
export const getShareCodeForTodo = (todoId) => {
  try {
    // Get existing shared todos
    const sharedTodos = JSON.parse(localStorage.getItem("taskshare_shared_todos")) || [];
    
    // Find the shared todo
    const sharedTodo = sharedTodos.find(todo => todo.todoId === todoId);
    
    return sharedTodo ? sharedTodo.shareCode : null;
  } catch (error) {
    console.error("Error getting share code:", error);
    return null;
  }
};

/**
 * Checks if a todo is currently shared
 * @param {string} todoId - The ID of the todo
 * @returns {boolean} True if the todo is shared
 */
export const isTodoShared = (todoId) => {
  return getShareCodeForTodo(todoId) !== null;
};

/**
 * Gets all shared todos
 * @returns {Array} Array of shared todo objects
 */
export const getAllSharedTodos = () => {
  try {
    return JSON.parse(localStorage.getItem("taskshare_shared_todos")) || [];
  } catch (error) {
    console.error("Error getting shared todos:", error);
    return [];
  }
};