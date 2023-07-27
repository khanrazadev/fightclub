import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/profile';
import { useNavigate, useParams } from 'react-router-dom';
import useToastNotification from '../../hooks/useToastNotification';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { loading, message, error } = useSelector(state => state.profile);

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  if (message) {
    setTimeout(function () {
      navigate('/login');
    }, 2000);
  }
  useToastNotification({ error, message });

  return (
    <Container py={19} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          my={'16'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
          children="reset password"
        />
        <VStack spacing={8}>
          <Input
            required
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            width={'full'}
            type="submit"
            colorScheme="yellow"
          >
            Update Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
