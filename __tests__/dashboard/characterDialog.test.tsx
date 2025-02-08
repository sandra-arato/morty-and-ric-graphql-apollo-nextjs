import '@testing-library/jest-dom';
import '@/__mocks__/matchMediaMock.mock';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CharacterDialog from '@/app/dashboard/characterDialog';
import { Character } from '@/app/types';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
  type: 'Mad',
  gender: 'male',
  episode: [],
  location: { name: 'Mars', url: 'none' },
  origin: { name: 'Earth', url: 'none' },
};

describe('CharacterDialog', () => {
  beforeEach(() => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <CharacterDialog selectedCharacter={mockCharacter} />
        </ThemeProvider>
      </ChakraProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders character button with name and image', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const name = screen.getByText(mockCharacter.name);
    expect(name).toBeInTheDocument();

    const image = screen.getByAltText(mockCharacter.name);
    expect(image).toBeInTheDocument();
  });

  it('opens dialog with character details on button click', async () => {
    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    const species = screen.getByText(mockCharacter.species);
    expect(species).toBeInTheDocument();

    const status = screen.getByText(mockCharacter.status);
    expect(status).toBeInTheDocument();

    const location = screen.getByText(mockCharacter.location.name);
    expect(location).toBeInTheDocument();

    const origin = screen.getByText(mockCharacter.origin.name);
    expect(origin).toBeInTheDocument();
  });

  // it('closes dialog on close button click', () => {
  //   const button = screen.getByRole('button');
  //   fireEvent.click(button);

  //   const closeButton = screen.getByText('close');
  //   fireEvent.click(closeButton);

  //   const dialogTitle = screen.queryByText(mockCharacter.name);
  //   expect(dialogTitle).not.toBeInTheDocument();
  // });
});
