import styles from './todo.module.scss';
import { IStatusesList, statusesEnum } from '../../interfaces';

interface IProps {
  itemsLeft: number | null;
  activeStatus: statusesEnum;
  statusesList: IStatusesList[];
  setActiveStatus: (val: statusesEnum) => void;
  handleClearCompletedTodos: () => Promise<void>;
}

const TodoFiltration: React.FC<IProps> = (props) => {
  const {
    itemsLeft,
    activeStatus,
    statusesList,
    setActiveStatus,
    handleClearCompletedTodos,
  } = props;

  return (
    <div className={styles['todo-card__footer']}>
      <div className={styles['']}>
        {props?.itemsLeft} {props?.itemsLeft === 1 ? 'item' : 'items'} left
      </div>
      <div className={styles['statuses']}>
        {statusesList.map((item: { id: number; label: statusesEnum }) => {
          return (
            <span
              key={item?.id}
              onClick={() => setActiveStatus(item?.label)}
              className={
                item?.label === activeStatus
                  ? styles['active-status']
                  : styles['inactive-status']
              }
            >
              {item?.label}
            </span>
          );
        })}
      </div>
      <div className={styles['']} onClick={handleClearCompletedTodos}>
        Clear completed
      </div>
    </div>
  );
};

export default TodoFiltration;
