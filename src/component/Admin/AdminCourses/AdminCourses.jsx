import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';
import Loader from '../../layout/Loader/Loader';

const AdminCourses = () => {
  const { courses, lectures } = useSelector(state => state.course);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const { error, message, loading } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const coureDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };
  const deleteButtonHandler = courseId => {
    console.log(courseId);
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));

    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses());
  }, [dispatch, error, message, onClose]);

  return (
    <Grid
      fontFamily={'mono'}
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {loading || !courses ? (
        <Loader color="purple.500" />
      ) : (
        <Box p={['0', '8']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            fontFamily={'mono'}
            children="All Courses"
            mt="16"
            textAlign={['center', 'left']}
          />

          <TableContainer w={['100vw', 'full']} boxShadow={'lg'}>
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
                {courses?.map(item => (
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
            id={courseId}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            addLectureHandler={addLectureHandler}
            lectures={lectures}
            loading={loading}
            title={title}
            setTitle={setTitle}
            video={video}
            setVideo={setVideo}
            description={description}
            setDescription={setDescription}
            videoPrev={videoPrev}
            setVideoPrev={setVideoPrev}
          />
        </Box>
      )}

      <Sidebar />
    </Grid>
  );
};

function Row({ item, coureDetailsHandler, deleteButtonHandler }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

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

          <Button onClick={onOpen} color={'purple.600'}>
            <RiDeleteBin7Fill />
            <ConfirmationModal
              isOpen={isOpen}
              onClose={onClose}
              deleteButtonHandler={deleteButtonHandler}
              id={item._id}
            />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  deleteButtonHandler,
  id,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Are you sure you want to delete ?</ModalHeader>
      <ModalCloseButton />

      <ModalFooter justifyContent={'space-between'}>
        <Button
          w={'30%'}
          colorScheme="yellow"
          onClick={() => {
            deleteButtonHandler(id);
          }}
        >
          Yes
        </Button>
        <Button variant="ghost">Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default AdminCourses;
