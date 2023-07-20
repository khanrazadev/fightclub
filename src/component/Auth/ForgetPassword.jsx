import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <Container py={19} h={'90vh'}>
      <form>
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
          <Button width={'full'} type="submit" colorScheme="yellow">
            Send reset link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
