import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../layout/Loader/Loader';

const CourseDetail = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const navigate = useNavigate();

  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid
      minH={'90vh'}
      templateColumns={['1fr', '3fr 1fr']}
      fontFamily={'mono'}
    >
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>

            <Heading
              fontFamily={'mono'}
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />

            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>

          <VStack>
            {lectures.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Flex w={['', '200vh']} justifyContent={'center'} alignItems={'center'}>
          <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, yellow.400, yellow.600)"
              backgroundClip="text"
              fontFamily={'mono'}
            >
              404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              No Lectures
            </Text>

            <Button
              colorScheme="yellow"
              bgGradient="linear(to-r, yellow.400, yellow.500, yellow.600)"
              variant="solid"
              onClick={() => {
                navigate('/');
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Flex>
      )}
    </Grid>
  );
};

export default CourseDetail;
