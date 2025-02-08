import '@testing-library/jest-dom';
import '@/__mocks__/matchMediaMock.mock';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { User } from '@/app/store/hooks';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

import Navigation from '@/app/dashboard/navigation';

describe('Navigation', () => {
  const mockUser: User = {
    name: 'John Doe',
    profession: 'Developer',
  };
  const mockOnSignOut = jest.fn();
  beforeEach(() => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Navigation user={mockUser} onSignOut={mockOnSignOut} />
        </ThemeProvider>
      </ChakraProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user name and profession', () => {
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Profession:')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('calls onSignOut when log out button is clicked', () => {
    const button = screen.getByRole('button', { name: /log out/i });
    act(() => {
      fireEvent.click(button);
    });

    expect(mockOnSignOut).toHaveBeenCalled();
  });

  it('allows editing user name and profession', async () => {
    const nameInput = screen.getByDisplayValue('John Doe');

    await act(async () => {
      fireEvent.click(nameInput);
    });
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    });
    const professionInput = screen.getByDisplayValue('Developer');
    await act(async () => {
      fireEvent.click(professionInput);
    });
    await act(async () => {
      fireEvent.change(professionInput, { target: { value: 'Designer' } });
    });
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Designer')).toBeInTheDocument();
  });
});
