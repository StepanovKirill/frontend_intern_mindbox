import { TodoItemI } from "./types";

export const getTodos = (): Array<TodoItemI> => {
  const items = localStorage.getItem('todos');
  
  return (items ? JSON.parse(items) : [])
}

export const saveItems = (newTodos: Array<TodoItemI>): void => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}