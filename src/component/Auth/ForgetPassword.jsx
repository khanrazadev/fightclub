import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import useToastNotification from '../../hooks/useToastNotification';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  useToastNotification({ error, message });
  return (
    <Container py={19} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          my={'16'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
          children="forget password"
        />
        <VStack spacing={8}>
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            width={'full'}
            type="submit"
            colorScheme="yellow"
          >
            Send reset link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
