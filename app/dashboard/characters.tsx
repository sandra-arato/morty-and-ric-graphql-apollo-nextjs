'use client';
import { useSuspenseQuery } from '@apollo/client';
import { Container, Heading, Flex, Group } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { Character, CharacterData } from '@/app/types';
import { GET_CHARACTERS } from '@/app/queries';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import CharacterDialog from './characterDialog';

type PageChange = {
  page: number;
  pageSize: number;
};

export default function Characters() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const { replace } = useRouter();

  const [page, setPage] = useState(
    params.has('page') ? Number(params.get('page')) : 1
  );

  const onPageChange = (change: PageChange) => {
    setPage(change.page);
  };
  const { data } = useSuspenseQuery(GET_CHARACTERS(page));
  const { characters } = data as CharacterData;

  useEffect(() => {
    replace(`${pathname}?page=${page.toString()}`);
  }, [page, replace, pathname]);

  return (
    <Container px="10">
      <Flex justifyContent="space-between" flexWrap={'wrap'}>
        <Heading
          as="h1"
          fontSize="3xl"
          margin="20px 0"
          fontWeight={600}
          display={'inline-flex'}
        >
          Characters
        </Heading>
        <PaginationRoot
          count={10}
          pageSize={2}
          defaultPage={1}
          variant="solid"
          page={page}
          onPageChange={onPageChange}
          display={'inline-flex'}
        >
          <Group attached>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Group>
        </PaginationRoot>
      </Flex>

      <Flex gap="10px" marginBottom={20} flexWrap="wrap">
        {characters.results.map((character: Character) => (
          <Flex
            key={character.id}
            borderRadius={4}
            _hover={{
              backgroundColor: '#f7fafc',
              cursor: 'pointer',
            }}
            display={'inline-flex'}
            flexDirection={'row'}
          >
            <CharacterDialog key={character.id} selectedCharacter={character} />
          </Flex>
        ))}
      </Flex>
    </Container>
  );
}
