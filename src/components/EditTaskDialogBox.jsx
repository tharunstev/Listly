/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

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


const WhiteButton = styled(Button)`
  color: white;
  border: 1px solid white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
`;


const EditTaskDialogBox = ({ open, onClose, onSave, task }) => {
  const [todo, setTodo] = useState('');

  useEffect(() => {
    if (task) {
      setTodo(task.todo); 
    }
  }, [task]);

  const handleSave = () => {
    if (todo.trim() === '') {
      
      return;
    }
    onSave(task.id, todo); 
  };

  return (
    <Wrapper open={open} onClose={onClose}>
      <DialogTitle sx={{color:"white"}}>Edit Task</DialogTitle>
      <DialogContent sx={{color:"white",padding:"20px"}}>
        <TextField
          autoFocus
          margin="dense"
          label="Task"
          type="text"
          fullWidth
          variant="outlined"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}

          sx={{input:{color:'white'}}}
        />
      </DialogContent>
      <DialogActions>
        <WhiteButton onClick={onClose} color="primary">
          Cancel
        </WhiteButton>
        <WhiteButton onClick={handleSave} color="primary">
          Save
        </WhiteButton>
      </DialogActions>
    </Wrapper>
  );
};

export default EditTaskDialogBox;
