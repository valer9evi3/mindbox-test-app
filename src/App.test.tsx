import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Todo App Additional Tests', () => {
  it('adds a todo and displays it in the list', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(input);
    expect(screen.getByText('New Todo')).toBeTruthy();
  });
  it('clears completed todos when clear button is clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Todo to be cleared' } });
    fireEvent.submit(input);
    fireEvent.click(screen.getByText('Todo to be cleared'));
    fireEvent.click(screen.getByText('Clear completed'));
    expect(screen.queryByText('Todo to be cleared')).toBeNull();
  });

  it('updates the filter correctly when filter buttons are clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Filter Test Todo' } });
    fireEvent.submit(input);
    fireEvent.click(screen.getByText('completed'));
    expect(screen.queryByText('Filter Test Todo')).toBeNull();
    fireEvent.click(screen.getByText('active'));
    expect(screen.getByText('Filter Test Todo')).toBeTruthy();
  });
});
