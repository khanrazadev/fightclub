import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  height: '100%',
  border: 'none',
  color: '#ECC94B',
  backgroundColor: 'white',
};
const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};
const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const imageChangeHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} spacing={'16'} justifyContent={'center'}>
        <Heading children="Registration" textTransform={'uppercase'} />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size={'xl'} />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc@gmail.com"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="chooseAvatar" children="Choose avatar" />
            <Input
              accept="image/*"
              id="chooseAvatar"
              type="file"
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={imageChangeHandler}
            />
          </Box>
          <Button colorScheme="yellow" my={'4'} type="submit">
            Sign Up
          </Button>
          <Box>
            Already signed up ?{' '}
            <Link to={'/login'}>
              <Button colorScheme="yellow" variant={'link'}>
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Signup;
