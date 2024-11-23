import { TextField } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';

interface IProps {
  handleSubmit: any;
  onSubmit: any;
  register: any;
}
const TodoForm: React.FC<IProps> = (props) => {
  const { register, handleSubmit, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} />
    </form>
  );
};

export default TodoForm;
