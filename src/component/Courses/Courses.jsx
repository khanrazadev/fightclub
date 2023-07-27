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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import useToastNotification from '../../hooks/useToastNotification';
import { getMyProfile } from '../../redux/actions/user';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async couseId => {
    await dispatch(addToPlaylist(couseId));
    setTimeout(function () {
      dispatch(getMyProfile());
    }, 1000);
  };

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useToastNotification({ error, message });
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
  }, [category, keyword, dispatch]);
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
        {courses?.length > 0 ? (
          courses.map(item => (
            <CourseCard
              key={item._id}
              views={item.views}
              title={item.title}
              imageSrc={item.poster.url}
              creator={item.createdBy}
              description={item.description}
              id={item._id}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              laoding={loading}
            />
          ))
        ) : (
          <Heading mt={'4'} children="Course not found." />
        )}
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
  loading,
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
          <Button
            onClick={() => addToPlaylistHandler(id)}
            colorScheme="yellow"
            variant={'ghost'}
            isLoading={loading}
          >
            Add to playlist
          </Button>
        </Stack>
      </VStack>
    </>
  );
}

export default Courses;
