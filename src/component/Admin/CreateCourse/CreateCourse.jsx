import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { fileUploadCss } from '../../Auth/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import Loader from '../../layout/Loader/Loader';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);

  const imageChangeHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      if (message) {
        setTitle('');
        setDescription('');
        setCategory('');
        setCreatedBy('');
        setImagePrev('');
        setImage('');
      }
    }
  }, [dispatch, error, message]);

  const categories = [
    'Mixed Martial Arts',
    'Kick Boxing',
    'Tae Kwon Do',
    'Wrestling',
    'Muay Thai',
    'Boxing',
    'Karate Kata',
  ];

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      fontFamily={'mono'}
    >
      {loading ? (
        <Loader color="purple.500" />
      ) : (
        <Container py="16">
          <form onSubmit={submitHandler}>
            <Heading
              textTransform={'uppercase'}
              children="Create Course"
              my="16"
              textAlign={['center', 'left']}
            />

            <VStack m="auto" spacing={'8'}>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                type={'text'}
                focusBorderColor="purple.300"
              />
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                resize="vertical"
                focusBorderColor="purple.300"
                style={{
                  maxHeight: '100px',
                  overflowY: 'auto',
                }}
              />
              <Input
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
                placeholder="Creator Name"
                type={'text'}
                focusBorderColor="purple.300"
              />
              <Select
                focusBorderColor="purple.300"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>Category</option>
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Input
                accept="image/*"
                required
                type={'file'}
                focusBorderColor="purple.300"
                css={{
                  '&::file-selector-button': {
                    ...fileUploadCss,
                    color: 'purple',
                  },
                }}
                onChange={imageChangeHandler}
              />
              {imagePrev && (
                <Image
                  src={imagePrev}
                  maxH={'xs'}
                  objectFit={'contain'}
                  boxShadow={'dark-lg'}
                />
              )}
              <Button
                isLoading={loading}
                w="full"
                colorScheme={'purple'}
                type="submit"
              >
                Create
              </Button>
            </VStack>
          </form>
        </Container>
      )}
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
