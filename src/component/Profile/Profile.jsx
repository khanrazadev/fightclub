import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCss } from '../Auth/Signup';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';
import useToastNotification from '../../hooks/useToastNotification';
import { cancelSubscription } from '../../redux/actions/subscription';
import { toast } from 'react-hot-toast';

const Profile = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(getMyProfile());
  };
  const removeFromPlayListHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(getMyProfile());
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
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch(getMyProfile());
      dispatch({ type: 'clearMessage' });
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subscriptionError, subscriptionMessage]);

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  return (
    <Container minH={'95vh'} maxW="container.xl" py="8" fontFamily={'mono'}>
      <Heading
        children="Profile"
        m="8"
        textTransform={'uppercase'}
        fontFamily={'mono'}
      />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        boxShadow={'lg'}
        alignItems={'center'}
        spacing={['8', '16']}
        padding="8"
      >
        <VStack>
          <Avatar boxSize={48} src={user.avatar.url} />
          <Button onClick={onOpen} variant={'ghost'} colorScheme="yellow">
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>{' '}
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'active' ? (
                <Button
                  isLoading={subscriptionLoading}
                  onClick={cancelSubscriptionHandler}
                  color={'yellow.500'}
                  variant="unstyled"
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={'md'} my="8" fontFamily={'mono'} />
      {user.playlist.length > 0 ? (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap="wrap"
          p="4"
        >
          {user.playlist.map(element => (
            <Card key={element.course} boxShadow={'lg'} className="course">
              <CardBody>
                <Image
                  src={element.poster}
                  borderRadius="lg"
                  objectFit={'cover'}
                  boxSize={'3xs'}
                />
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Link to={`/course/${element.course}`}>
                    <Button variant={'ghost'} colorScheme="yellow">
                      Watch Now
                    </Button>
                  </Link>
                  <Button
                    onClick={() => removeFromPlayListHandler(element.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Stack>
      ) : (
        <Box
          position="relative"
          boxShadow={'lg'}
          borderRadius={'lg'}
          padding="10"
        >
          <Divider />
          <AbsoluteCenter fontFamily={'mono'} bg="white" px="4">
            No video
          </AbsoluteCenter>
        </Box>
      )}

      <ChangePhotoModal
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
      />
    </Container>
  );
};

function ChangePhotoModal({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    setImage('');
    setImagePrev('');
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default Profile;
