import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const categories = [
    'Boxing',
    'Kickboxing',
    'Sanda',
    'Judo',
    'Jujitsu',
    'aikido',
  ];
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading textAlign={'center'} children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        focusBorderColor="yellow.500"
        type="text"
      />
      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&:: -webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text>{item}</Text>
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <CourseCard
          views="2"
          title="Sample 1"
          imageSrc="https://w0.peakpx.com/wallpaper/852/140/HD-wallpaper-conor-mcgregor-mma-ufc-world-champion.jpg"
          creator={'razri'}
          description={'alalal'}
          id="1"
          lectureCount="2"
        />
      </Stack>
    </Container>
  );
};

function CourseCard({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  lectureCount,
  description,
  lecture,
}) {
  return (
    <>
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize={'60'} objectFit={'cover'} />
        <Heading
          children={title}
          textAlign={['center', 'left']}
          maxW={'200px'}
          size={'sm'}
          noOfLines={3}
        />
        <Text noOfLines={2} children={description} />
        <HStack>
          <Text
            children={'Creator'}
            textTransform={'uppercase'}
            fontWeight={'bold'}
          />
          <Text
            children={creator}
            textTransform={'uppercase'}
            fontFamily={'body'}
          />
        </HStack>
        <Heading
          size={'xs'}
          children={`Lectures - ${lectureCount}`}
          textTransform={'uppercase'}
        />
        <Heading
          size={'xs'}
          children={`Views - ${views}`}
          textTransform={'uppercase'}
        />

        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to={`/course/${id}`}>
            <Button colorScheme="yellow">Watch Now</Button>
          </Link>
          <Link to={`/course/${id}`}>
            <Button colorScheme="yellow" variant={'ghost'}>
              Add to playlist
            </Button>
          </Link>
        </Stack>
      </VStack>
    </>
  );
}

export default Courses;
