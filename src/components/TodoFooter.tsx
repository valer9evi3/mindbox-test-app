import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Filter } from '../types/todo';

interface TodoFooterProps {
  activeCount: number;
  onFilterChange: (filter: Filter) => void;
  currentFilter: Filter;
  onClearCompleted: () => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  activeCount,
  onFilterChange,
  currentFilter,
  onClearCompleted,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 1, sm: 0 },
        px: 2,
        py: 1,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        {(['all', 'active', 'completed'] as const).map((filter) => (
          <Button
            key={filter}
            onClick={() => onFilterChange(filter)}
            sx={{
              textTransform: 'capitalize',
              color:
                currentFilter === filter ? 'primary.main' : 'text.secondary',
              minWidth: 'auto',
              px: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {filter}
          </Button>
        ))}
      </Box>
      <Button
        onClick={onClearCompleted}
        sx={{
          textTransform: 'none',
          color: 'text.secondary',
          display: { xs: 'block', sm: 'inline-flex' },
          textAlign: 'center',
          '&:hover': {
            color: 'text.primary',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        Clear completed
      </Button>
    </Box>
  );
};
