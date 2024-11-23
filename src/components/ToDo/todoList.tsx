import {
  BaseQueryFn,
  FetchArgs,
  MutationDefinition,
} from '@reduxjs/toolkit/query';
import { ITodoItem, statusesEnum } from '../../interfaces';
import { TodoItem } from '../index';
import styles from './todo.module.scss';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { TypedMutationTrigger } from '@reduxjs/toolkit/dist/query/react';

interface IProps {
  todoList: any;
  updateTodoReq: TypedMutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      'todos',
      any,
      'patientsApi'
    >,
    unknown,
    BaseQueryFn
  >;
  activeStatus: statusesEnum;
}

const TodoList: React.FC<IProps> = (props) => {
  const filterMap = {
    [statusesEnum.ALL]: () => true,
    [statusesEnum.COMPLETED]: (item: ITodoItem) => item.completed,
    [statusesEnum.ACTIVE]: (item: ITodoItem) => !item.completed,
  };
  return (
    <div className={styles['todo-list']}>
      {props?.todoList
        ?.filter(filterMap[props.activeStatus])
        .map((item: ITodoItem) => (
          <TodoItem
            completed={item?.completed}
            todoLabel={item?.title}
            onClick={() =>
              props.updateTodoReq({
                id: item?.id,
                completed: !item?.completed,
                title: item?.title,
              })
            }
            id={item?.id}
            key={item?.id}
          />
        ))}
    </div>
  );
};

export default TodoList;
