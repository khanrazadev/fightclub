import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialInstagramCircular,
  TiSocialTwitterCircular,
  TiSocialYoutubeCircular,
} from 'react-icons/ti';
const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900">
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading size={'md'} children="All rights reserved" color={'white'} />
          <Heading children="@fightclub" color={'yellow.400'} size={'xs'} />
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent={'center'}
          color={'white'}
          fontSize={'50'}
        >
          <a href="" target="_blank">
            <TiSocialYoutubeCircular />
          </a>
          <a href="" target="_blank">
            <TiSocialInstagramCircular />
          </a>
          <a href="" target="_blank">
            <TiSocialTwitterCircular />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
