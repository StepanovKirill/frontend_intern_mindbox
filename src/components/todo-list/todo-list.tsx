import React from 'react';
import { TodoItemI } from '../../utils/types';
import { TodoItem } from '../todo-item/todo-item';
import styles from './todo-list.module.css';

type TodoListPropsT = {
  todos: Array<TodoItemI>; 
  switchDone: (id: string) => void;
  deleteTodo: (id: string) => void;
  activeTab: string;
};

export const TodoList: React.FC<TodoListPropsT> = ({todos, switchDone, deleteTodo, activeTab}) => {
  const renderTodos = () => {
    switch (activeTab) {
      case 'all': return todos;
      case 'completed': return todos.filter(item => item.isDone);
      case 'active': return todos.filter(item => !item.isDone);
    }
  };
  return (
    <ul className={styles.todoContainer} id='todoList'>
      {renderTodos()?.map((item) => (<TodoItem key={item.id} {...item} switchDone={switchDone} deleteTodo={deleteTodo}/>))}
    </ul>
  )
}

