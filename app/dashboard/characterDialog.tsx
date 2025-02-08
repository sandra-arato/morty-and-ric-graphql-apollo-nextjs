import React from 'react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogBackdrop,
  DialogTrigger,
  Button,
  Heading,
  Flex,
  DataListRoot,
  DataList,
  Text,
} from '@chakra-ui/react';
import { Character } from '@/app/types';
import Image from 'next/image';
import { imageLoader } from './imageLoader';

type CharacterProps = {
  selectedCharacter: Character;
};

export default function CharacterDialog({ selectedCharacter }: CharacterProps) {
  return (
    <DialogRoot
      size="lg"
      placement="center"
      defaultOpen={false}
      motionPreset="slide-in-bottom"
      id={`dialog-${selectedCharacter?.id}`}
    >
      <DialogBackdrop />
      <DialogTrigger asChild border={'1px solid #E2E8F0'} borderRadius={4}>
        <Button
          display={'inline-flex'}
          flexDirection={'column'}
          width={'15vw'}
          minW={'180px'}
          position={'relative'}
          height={180}
          variant="outline"
        >
          <Image
            src={selectedCharacter?.image}
            alt={selectedCharacter?.name}
            width={100}
            height={100}
            placeholder={imageLoader}
          />
          <Heading
            as="h2"
            fontSize={'md'}
            justifyContent={'center'}
            display={'inline-flex'}
            maxWidth={'calc(100% - 20px)'}
            textWrap={'wrap'}
            lineHeight={'20px'}
            fontWeight={600}
          >
            {selectedCharacter?.name}
          </Heading>
        </Button>
      </DialogTrigger>
      <DialogContent
        position={'absolute'}
        top={'50%'}
        insetStart={'50%'}
        transform={'translate(-50%, -50%)'}
      >
        <DialogBody pt="4">
          <Flex>
            <Image
              src={selectedCharacter?.image}
              alt={selectedCharacter?.name}
              width={180}
              height={180}
              placeholder={imageLoader}
            />
            <Flex flexDir={'column'} pl={4}>
              <DialogTitle textStyle={'2xl'} py={2}>
                {selectedCharacter?.name}
              </DialogTitle>
              <DataListRoot orientation="horizontal" gap={1}>
                <DataList.Item>
                  <DataList.ItemLabel>Species</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {selectedCharacter?.species}
                  </DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Status</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {selectedCharacter?.status}
                  </DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Location</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {selectedCharacter?.location?.name || 'Unknown'}
                  </DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Origin</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {selectedCharacter?.origin?.name || 'Unknown'}
                  </DataList.ItemValue>
                </DataList.Item>
              </DataListRoot>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogCloseTrigger
          top="2"
          insetEnd="2"
          bg="bg"
          position="absolute"
          borderRadius={4}
        >
          <Text fontSize={'2xs'}>close</Text>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogRoot>
  );
}
