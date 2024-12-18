import React from 'react';
import { Button } from '@mui/material';
import UseTodoHooks from './todo.hooks';
import { CustomInput, TodoList, TodoFiltration } from '../index';
import styles from './todo.module.scss';

const TodoCard: React.FC = () => {
  const {
    todoList,
    itemsLeft,
    inputValue,
    activeStatus,
    statusesList,
    addNewTodo,
    updateTodoReq,
    setInputValue,
    setActiveStatus,
    handleClearCompletedTodos,
  } = UseTodoHooks();

  return (
    <div className={styles['todo-card']}>
      <h3 className={styles['todo-card__heading']}>Todos</h3>
      <div className={styles['todo-section']}>
        <div className={styles['input-container']}>
          <CustomInput
            placeholder='What needs to be done?'
            onChange={(e: any) => setInputValue(e?.target?.value)}
            value={inputValue}
          />
          <Button variant='contained' onClick={addNewTodo}>
            Add
          </Button>
        </div>
        {todoList && todoList?.length > 0 ? (
          <TodoList
            todoList={todoList}
            updateTodoReq={updateTodoReq}
            activeStatus={activeStatus}
          />
        ) : (
          <div className={styles["empty-list"]}>todo list is empty</div>
        )}

        <TodoFiltration
          itemsLeft={itemsLeft}
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
          statusesList={statusesList}
          handleClearCompletedTodos={handleClearCompletedTodos}
        />
      </div>
    </div>
  );
};

export default TodoCard;
