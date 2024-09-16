import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Wrapper = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 10px;
    width: 400px;
    background-color: #262A4A;
    border: 2px #808492;
  }

  @media (max-width: 600px) {
    & .MuiDialog-paper {
      width: 90%;
    }
  }
`;

const DialogContent = styled('div')`
  padding: 20px;
  color: white;
`;

const WhiteButton = styled(Button)`
  color: white;
  border: 1px solid white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
`;

const NewTaskDialogBox = ({ open, onClose, onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAddTask({
      
      todo: inputValue,
      completed: false,
      userId: 5 
    });
    setInputValue('');
    onClose();
  };

  return (
    <Wrapper open={open} onClose={onClose} >
      <DialogTitle sx={{ color: "white" }}>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task"
          type="text"
          fullWidth
          variant="standard"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          
          sx={{ input: { color: 'white' } }}
        />
      </DialogContent>
      <DialogActions>
        <WhiteButton onClick={onClose} color="primary">
          Cancel
        </WhiteButton>
        <WhiteButton onClick={handleAdd} color="primary">
          Add
        </WhiteButton>
      </DialogActions>
    </Wrapper>
  );
};

export default NewTaskDialogBox;
