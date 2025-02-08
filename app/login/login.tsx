'use client'
import React, { useState } from 'react';
 import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Input,
  Stack,
  Fieldset,
  Field
} from "@chakra-ui/react";
import Image from "next/image";
import useAuth from '../store/hooks';

type LoginProps = {
  onSubmit: () => void;  
}

export default function Login({ onSubmit}: LoginProps) {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const { setUser } = useAuth();

  const isFilled = name && profession;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser({ name, profession });
    onSubmit();
  };


  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign="center" fontSize="xl" pt="20vh">
        <VStack gap="8">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Rick & Morty's Character Library"
            width={80}
            height={80}
            priority
          />
          <Heading size="2xl" letterSpacing="tight">
            Rick & Morty&apos;s Character Library
          </Heading>
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>Details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your details below to browse the library
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content marginBottom={8}>
              <Field.Root >
                <Field.Label htmlFor="name" border={1} minW="100%">
                  <Stack w="100%">
                    <Text>Name</Text>
                    <Input type="text" name="name" bg="whitesmoke" id="name" paddingLeft="8px" required onChange={handleNameChange} />
                  </Stack>
                </Field.Label>
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="profession" border={1} minW="100%">
                  <Stack w="100%">
                    <Text>Profession</Text>
                    <Input type="text" name="profession" bg="whitesmoke" id="profession" paddingLeft="8px" required onChange={handleProfessionChange}/>
                  </Stack>
                </Field.Label>
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" alignSelf="center" bg="blue.500" color="white" _hover={{ bg: "blue.600" }} _active={{ bg: "blue.700" }} w="100%" disabled={!isFilled}>
              Submit
            </Button>
          </Fieldset.Root>
        </VStack>
      </Box>
    </form>
  );
};
