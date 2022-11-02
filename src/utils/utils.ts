import { TodoItemI } from "./types";

export const getTodos = (): Array<TodoItemI> => {
  const items = localStorage.getItem('todos');
  return (items ? JSON.parse(items) : [])
}

export const saveTodos = (newTodos: Array<TodoItemI>): void => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}

export const beautifyText = (str: string): string => {
  str = str.trim()
  console.log(str[0].toUpperCase() + str.slice(1) + ';')
  return str[0].toUpperCase() + str.slice(1) + ';'
}