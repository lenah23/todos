import { Button } from '@mui/material';
import UseTodoHooks from './todo.hooks';
import { TodoForm, CustomModal } from '../index';
import styles from './todo.module.scss';

interface IProps {
  todoLabel: string;
  completed: boolean;
  onClick: () => void;
  id: number;
}

const TodoItem: React.FC<IProps> = (props) => {
  const { todoLabel, completed, onClick, id } = props;
  const {
    open,
    handleClickOpen,
    setActiveAction,
    deleteTododReq,
    handleSubmit,
    handleClose,
    setTodoId,
    onSubmit,
    control,
    activeAction,
  } = UseTodoHooks();

  return (
    <div className={styles['todo-item']}>
      <div className={styles['content']} onClick={onClick}>
        <div className={styles['circle']}>
          {completed && <span>&#10003;</span>}
        </div>
        <span
          className={completed ? styles['completed-todo-label'] : undefined}
        >
          {todoLabel}
        </span>
      </div>
      <div className={styles['actions']}>
        <Button
          variant='outlined'
          onClick={() => {
            setActiveAction('edit');
            handleClickOpen();
            setTodoId(id);
          }}
        >
          Edit
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={() => {
            handleClickOpen();
            setActiveAction('delete');
          }}
        >
          Delete
        </Button>
      </div>
      <CustomModal
        children={
          activeAction === 'edit' && (
            <TodoForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              control={control}
            />
          )
        }
        handleClose={handleClose}
        open={open}
        agreeFunc={() =>
          activeAction === 'delete'
            ? deleteTododReq(id)
            : handleSubmit(onSubmit)()
        }
        title={
          activeAction === 'delete'
            ? 'Are you sure you want to delete the todo'
            : 'Please edit the values'
        }
      />
    </div>
  );
};

export default TodoItem;
