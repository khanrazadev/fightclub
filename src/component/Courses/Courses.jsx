import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import useToastNotification from '../../hooks/useToastNotification';
import { getMyProfile } from '../../redux/actions/user';
import Loader from '../layout/Loader/Loader';

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
    'Mixed Martial Arts',
    'Kick Boxing',
    'Tae Kwon Do',
    'Wrestling',
    'Muay Thai',
    'Boxing',
    'Karate Kata',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useToastNotification({ error, message });
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
  }, [category, keyword, dispatch]);
  return (
    <Container minH={'95vh'} maxW={'container.xl'} paddingY={'8'}>
      <Heading
        textAlign={'center'}
        fontFamily={'mono'}
        children="All Courses"
        m={'8'}
      />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        fontFamily={'mono'}
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
            <Text fontFamily={'mono'}>{item}</Text>
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
          <>
            {loading ? (
              <Loader />
            ) : (
              <Heading mt={'4'} children="Course not found." />
            )}
          </>
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
      <Card maxW="sm" className="course" boxShadow={'md'}>
        <CardBody>
          <Image
            src={imageSrc}
            objectFit={'cover'}
            borderRadius={'lg'}
            boxSize={'sm'}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" fontFamily={'mono'} noOfLines={2}>
              {title}
            </Heading>
            <Text
              noOfLines={2}
              children={description}
              maxW={'60'}
              fontFamily={'monospace'}
            />
            <HStack>
              <Text
                children={'Creator'}
                fontFamily={'mono'}
                textTransform={'uppercase'}
                fontWeight={'bold'}
              />
              <Text
                children={creator}
                textTransform={'uppercase'}
                fontFamily={'mono'}
              />
            </HStack>

            <HStack justifyContent={['space-between']}>
              <Heading
                size={'xs'}
                children={`${lectureCount} ${
                  lectureCount <= 1 ? 'lecture' : 'lectures'
                }`}
                textTransform={'uppercase'}
                fontFamily={'mono'}
              />
              <HStack>
                <ViewIcon />
                <Text
                  fontSize={'xs'}
                  children={views}
                  fontWeight={'bold'}
                  fontFamily={'mono'}
                />
              </HStack>
            </HStack>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
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
        </CardFooter>
      </Card>
    </>
  );
}

export default Courses;
