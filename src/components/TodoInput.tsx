import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <IconButton sx={{ mr: 1 }}>
        <KeyboardArrowDown fontSize="small" />
      </IconButton>
      <TextField
        fullWidth
        variant="standard"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          '& .MuiInput-underline:before': {
            borderBottom: 'none'
          },
          '& .MuiInput-underline:hover:before': {
            borderBottom: 'none'
          }
        }}
      />
    </Box>
  );
};