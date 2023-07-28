import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Signup';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [],
  loading,
  title,
  setTitle,
  video,
  setVideo,
  description,
  setDescription,
  videoPrev,
  setVideoPrev,
}) => {
  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily={'mono'}
          fontSize={['xs', 'md']}
          boxShadow={'lg'}
        >
          {courseTitle}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={['2', '16']}>
          <Grid templateColumns={['1fr', '3fr 1fr']} fontFamily={'mono'}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading fontFamily={'mono'} children={courseTitle} />
                <Heading children={`#${id}`} size="sm" opacity={0.4} />
              </Box>

              <Heading fontFamily={'mono'} children={'Lectures'} size="lg" />

              {lectures.map((item, i) => (
                <VideoCard
                  key={i}
                  title={item.title}
                  description={item.description}
                  num={i + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  onClose={onClose}
                />
              ))}
            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform="uppercase"
                  />

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Textarea
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    h={'40'}
                    maxH={'40'}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <Button
                    w="full"
                    colorScheme={'purple'}
                    type="submit"
                    isLoading={loading}
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter boxShadow={'dark-lg'}>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  onClose,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} noOfLines={1} />
      </Box>

      <Popover>
        <PopoverTrigger>
          <Button color={'purple.600'}>
            <RiDeleteBin7Fill />
          </Button>
        </PopoverTrigger>
        <PopoverContent w={'40vh'}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
          <PopoverBody display={'flex'} justifyContent={'space-between'}>
            <Button
              w={'30%'}
              colorScheme="yellow"
              onClick={() => deleteButtonHandler(courseId, lectureId)}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
}
