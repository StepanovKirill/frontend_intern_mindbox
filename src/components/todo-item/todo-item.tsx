import React, {FC} from 'react';
import { TodoItemI } from '../../utils/types';
import styles from './todo-item.module.css';
import {ReactComponent as DoneIcon} from './doneIcon.svg'
import {ReactComponent as DeleteIcon} from './deleteIcon.svg'
import deepEqual from "fast-deep-equal";

type TodoItemPropsI =
  TodoItemI &
  {
    switchDone: (id: string) => void;
    deleteTodo: (id: string) => void;
  };

export const TodoItem: FC<TodoItemPropsI> = React.memo(({text, isDone, id, switchDone, deleteTodo}) => {

  return (
    <li className={styles.itemContainer}>
      <button onClick={() => {switchDone(id)}} className={`${styles.button} ${isDone && styles.doneButton}`}>
        {isDone ? <DoneIcon/> : null}
      </button>
      <div className={`${styles.todoText} ${isDone && styles.doneText }`}>{text};</div>
      <button onClick={() => {deleteTodo(id)}} className={styles.deleteIcon}>
        <DeleteIcon/>
      </button>
    </li>
  )
  }, deepEqual);