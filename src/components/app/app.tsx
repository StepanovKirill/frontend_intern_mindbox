import React from 'react';
import { TodoItemI } from '../../utils/types';
import { beautifyText, getTodos, saveTodos } from '../../utils/utils';
import { InputTodo } from '../input-todo/input-todo';
import { TodoList } from '../todo-list/todo-list';
import styles from './app.module.css'

export const App = () => {
  const [todos, setTodos] = React.useState<Array<TodoItemI>>([]);
  const [tab, setActiveTab] = React.useState<string>('all');
  const remainedTodos = React.useMemo(() => todos.filter(item => !item.isDone).length, [todos]);

  React.useEffect(() => {
    // если уже есть список дел, достаем из хранилища / с сервера при монтировании компонента
    customSetTodos(getTodos());
  }, []); 

  const customSetTodos = React.useCallback((newTodos: Array<TodoItemI>) => {
    saveTodos(newTodos)
    setTodos(newTodos);
  }, [])

  const addTodo = (todo: TodoItemI) => {
    customSetTodos([{...todo, text: beautifyText(todo.text)}, ...todos]);
  };

  const deleteTodo = (id: string) => {
    const currentTodoIndex = todos.findIndex(item => item.id === id);
    if (currentTodoIndex !== -1) {
      const newTodos = [...todos];
      newTodos.splice(currentTodoIndex, 1);      
      customSetTodos(newTodos);
    }
  }

  const switchDone = (id: string) => {
    const currentTodoIndex = todos.findIndex(item => item.id === id);
    if (currentTodoIndex !== -1) {
      const currentTodo = todos[currentTodoIndex];
      const newTodos = [...todos];
      
      newTodos[currentTodoIndex] = {...currentTodo, isDone: !currentTodo.isDone};
      customSetTodos(newTodos);
    }
  };

  const clearCompletedTodos = () => {
    const newTodos = todos.filter(item => !item.isDone);
    customSetTodos(newTodos);
    setActiveTab('all')
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.appContainer}>
        <p className={styles.title}>Todos test app for Mindbox</p>
        <InputTodo addTodo={addTodo}/>
        <TodoList switchDone={switchDone} deleteTodo={deleteTodo} todos={todos} activeTab={tab}/>
        <div className={styles.filterContainer}>
          <p data-test="remaining-counter" className={styles.text}>
            {remainedTodos ? `${remainedTodos} осталось сделать` : 'Можно отдохнуть, пока дел нет'}
          </p>
          <div data-test="tabs">
            <button className={`${styles.button} ${tab === 'all' && styles.activeTab}`} onClick={() => {setActiveTab('all')}}>Все</button>
            <button className={`${styles.button} ${tab === 'active' && styles.activeTab}`} onClick={() => {setActiveTab('active')}}>Активные</button>
            <button className={`${styles.button} ${tab === 'completed' && styles.activeTab}`} onClick={() => {setActiveTab('completed')}}>Выполненные</button>
            <button className={styles.button} onClick={() => {clearCompletedTodos()}}>Удалить выполненные</button>
          </div>
        </div>
      </main>
    </div>
  );
}