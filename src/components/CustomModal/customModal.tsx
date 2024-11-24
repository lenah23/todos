import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  open: boolean;
  handleClose: () => void;
  agreeFunc: () => void;
  title: string;
  children?: ReactNode
}

const CustomModal: React.FC<IProps> = (props) => {
  const { open, handleClose, title, agreeFunc, children } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        '& .MuiDialog-paper': {
          minWidth: '500px',
          padding: "0 25px"
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      {children && children}
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button
          onClick={() => {
            agreeFunc();
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
