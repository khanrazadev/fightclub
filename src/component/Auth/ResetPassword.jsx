import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  return (
    <Container py={19} h={'90vh'}>
      <form>
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
          <Button width={'full'} type="submit" colorScheme="yellow">
            Update Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
