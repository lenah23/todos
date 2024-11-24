import styles from './customInput.module.scss';

interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

const CustomInput: React.FC<IProps> = (props) => {
  const { onChange, placeholder, value } = props;
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      className={styles['todo-input']}
      value={value}
    />
  );
};

export default CustomInput;
