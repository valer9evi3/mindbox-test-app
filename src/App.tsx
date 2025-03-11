import { useState, useCallback } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Filter, Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = useCallback((text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text, completed: false },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <Container
      maxWidth='sm'
      sx={{
        mt: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant='h1'
        align='center'
        sx={{
          fontSize: { xs: '3rem', sm: '5rem' },
          fontWeight: 100,
          color: '#ead7d7',
          mb: { xs: 2, sm: 4 },
        }}
      >
        todos
      </Typography>
      <Box
        sx={{
          position: 'relative',
          transform: 'none',
          transition: 'transform 0.3s ease',
        }}
      >
        <Paper
          elevation={1}
          sx={{
            position: 'absolute',
            top: 8,
            left: 4,
            right: 4,
            height: '100%',
            zIndex: -2,
            backgroundColor: '#f5f5f5',
          }}
        />
        <Paper
          elevation={1}
          sx={{
            position: 'absolute',
            top: 4,
            left: 2,
            right: 2,
            height: '100%',
            zIndex: -1,
            backgroundColor: '#f8f8f8',
          }}
        />
        <Paper
          elevation={2}
          sx={{
            position: 'relative',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 4,
              right: 4,
              height: '8px',
              background: '#00000008',
              borderRadius: '0 0 4px 4px',
            },
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <TodoInput onAdd={addTodo} />
            <Box
              sx={{
                maxHeight: '400px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
            >
              <TodoList todos={filteredTodos} onToggle={toggleTodo} />
              {todos.length > 0 && (
                <TodoFooter
                  activeCount={activeCount}
                  onFilterChange={setFilter}
                  currentFilter={filter}
                  onClearCompleted={clearCompleted}
                />
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
