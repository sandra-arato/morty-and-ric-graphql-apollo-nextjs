import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Login from '@/app/login/login';

describe('Navigation', () => {

  const mockOnSubmit = jest.fn();
  beforeEach(() => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Login onSubmit={mockOnSubmit} />
      </ChakraProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user name and profession', () => {
    expect(screen.getByText(`Rick & Morty's Character Library`)).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Profession')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits the form', async () => {
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rick' } });
    fireEvent.change(screen.getByLabelText(/profession/i), { target: { value: 'Scientist' } });
    
    expect(screen.getByLabelText(/name/i)).toHaveValue('Rick');
    expect(screen.getByLabelText(/profession/i)).toHaveValue('Scientist');

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});