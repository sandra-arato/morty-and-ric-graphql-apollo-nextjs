'use client';
import useAuth, { User } from '@/app/store/hooks';
import { useEffect, useState } from 'react';
import { Button, Editable, Flex, Text } from '@chakra-ui/react';

type NavigationProps = {
  user: User | null;
  onSignOut: () => void;
};

export default function Navigation({ user, onSignOut }: NavigationProps) {
  const { setUser } = useAuth();

  const [currentUserName, setUserName] = useState<string>(user?.name || '');
  const [currentUserProfession, setUserProfession] = useState<string>(
    user?.profession || ''
  );

  useEffect(() => {
    setUser({ name: currentUserName, profession: currentUserProfession });
  }, [currentUserName, currentUserProfession, setUser]);

  return (
    <>
      <div>
        <Flex
          background={'blue.100'}
          padding="12px 48px"
          justifyContent="space-between"
          alignItems=""
          flexWrap="wrap"
        >
          <Flex
            justifyContent="space-between"
            flexWrap={'wrap'}
            md={{ flexWrap: 'nowrap' }}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Flex>
              <Text
                textStyle="xs"
                lineHeight={'40px'}
                color={'blue.400'}
                textTransform={'uppercase'}
                fontWeight={600}
              >
                Name:
              </Text>
              <Editable.Root
                value={currentUserName}
                onValueChange={(e) => setUserName(e.value)}
                placeholder="Click to edit"
                px="4"
                display={'inline-flex'}
                minW="180px"
                maxW="calc(100% - 360px)"
              >
                <Editable.Preview px="2" />
                <Editable.Input px="2" bg="gray.100" />
              </Editable.Root>
            </Flex>
            <Flex>
              <Text
                textStyle="xs"
                lineHeight={'40px'}
                color={'blue.400'}
                textTransform={'uppercase'}
                fontWeight={600}
              >
                Profession:
              </Text>
              <Editable.Root
                value={currentUserProfession}
                onValueChange={(e) => setUserProfession(e.value)}
                placeholder="Click to edit"
                display={'inline-flex'}
                px="4"
                minW="180px"
                maxW="calc(100% - 360px)"
              >
                <Editable.Preview px="2" />
                <Editable.Input px="2" bg="gray.100" />
              </Editable.Root>
            </Flex>
          </Flex>

          <Button
            type="button"
            onClick={onSignOut}
            bgColor={'blue.400'}
            color={'white'}
            padding="8px 16px"
          >
            Log out
          </Button>
        </Flex>
      </div>
    </>
  );
}
