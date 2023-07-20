import React from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const deleteButtonHandler = () => {};
  const deleteLectureButtonHandler = () => {};
  const addLectureHandler = () => {};
  const coureDetailsHandler = () => {
    onOpen();
  };
  const courses = [
    {
      _id: '12',
      title: 'Basic of mma',
      description: 'this is the intro my boi',
      category: 'MMA',
      poster: {
        url: 'https://w0.peakpx.com/wallpaper/821/809/HD-wallpaper-notorious-mac-mma-ufc-conor-mcgregor.jpg',
      },
      createdBy: 'Raza Khan',
      views: 123,
      numOfVideos: 13,
    },
    {
      _id: '12',
      title: 'Basic of mma',
      description: 'this is the intro my boi',
      category: 'MMA',
      poster: {
        url: 'https://w0.peakpx.com/wallpaper/821/809/HD-wallpaper-notorious-mac-mma-ufc-conor-mcgregor.jpg',
      },
      createdBy: 'Raza Khan',
      views: 123,
      numOfVideos: 13,
    },
    {
      _id: '12',
      title: 'Basic of mma',
      description: 'this is the intro my boi',
      category: 'MMA',
      poster: {
        url: 'https://w0.peakpx.com/wallpaper/821/809/HD-wallpaper-notorious-mac-mma-ufc-conor-mcgregor.jpg',
      },
      createdBy: 'Raza Khan',
      views: 123,
      numOfVideos: 13,
    },
    {
      _id: '12',
      title: 'Basic of mma',
      description: 'this is the intro my boi',
      category: 'MMA',
      poster: {
        url: 'https://w0.peakpx.com/wallpaper/821/809/HD-wallpaper-notorious-mac-mma-ufc-conor-mcgregor.jpg',
      },
      createdBy: 'Raza Khan',
      views: 123,
      numOfVideos: 13,
    },
  ];
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map(item => (
                <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={12}
          courseTitle={'BAsic of juitusu'}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={courses}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

function Row({ item, coureDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>

      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coureDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
