import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/profile';
import { useNavigate, useParams } from 'react-router-dom';

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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      // Wait for 1 seconds before navigating to '/login'
      setTimeout(function () {
        navigate('/login');
      }, 1000);
    }
  }, [dispatch, error, message, navigate]);

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
