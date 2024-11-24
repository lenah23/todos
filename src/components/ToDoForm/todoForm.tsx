import { TextField } from '@mui/material';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../CustomInput/customInput';

interface IProps {
  handleSubmit: any;
  onSubmit: any;
  register: any;
  control: any;
}

const TodoForm: React.FC<IProps> = (props) => {
  const { register, handleSubmit, onSubmit, control } = props;
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
