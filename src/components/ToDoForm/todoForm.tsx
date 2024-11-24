import { Control, Controller, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { IEditTodoValues } from '../../interfaces';
import {CustomInput} from '../index';

interface IProps {
  handleSubmit: UseFormHandleSubmit<IEditTodoValues | FieldValues, undefined>;
  onSubmit: (data: FieldValues | IEditTodoValues) => void;
  control: Control<FieldValues | IEditTodoValues, any>;
}

const TodoForm: React.FC<IProps> = (props) => {
  const { handleSubmit, onSubmit, control } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '10px' }}>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value } }) => (
            <CustomInput onChange={onChange} value={value} />
          )}
        />
      </div>
      <label htmlFor='completed'>
        <Controller
          name='completed'
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              id='completed'
              type='checkbox'
              checked={value}
              onChange={onChange}
              value={value}
            />
          )}
        />
        Completed
      </label>
    </form>
  );
};

export default TodoForm;
