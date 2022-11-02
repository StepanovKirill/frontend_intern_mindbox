import React, {FC} from 'react';
import { TodoItemI } from '../../utils/types';
import styles from './input-todo.module.css';
import { v4 as uuid } from 'uuid';

export const InputTodo: FC<{addTodo: (addTodo: TodoItemI) => void}> = ({addTodo}) => {
  const addTodoHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const text = new FormData(e.currentTarget).get('todo')?.toString();
    
    if (!text) return;
    
    addTodo({
      text: text,
      isDone: false,
      id: uuid(),
    })
    
    e.currentTarget.reset();
  }

  return (
  <form className={styles.container} onSubmit={addTodoHandler}>
    <input
      type="text"
      name='todo'
      className={styles.inputTodo}
      placeholder='что нужно сделать?'
      autoFocus
      data-test="input-todo"
      />
    <button className={styles.doneButton}>{'>'}</button>
  </form>)
}