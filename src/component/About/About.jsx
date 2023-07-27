import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import video from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { TermsAndConditions } from '../../assets/docs/TandC';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={8}>
    <VStack>
      <Avatar boxSize={['40', '48']} />
      <Text children="Co-founder" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Raza Khan" size={['md', 'xl']} />
      <Text
        textAlign={['center', 'left']}
        children="Welcome to FightClub!

I'm Raza Khan, the founder and a full-stack web developer. At FightClub, we're passionate about combat sports and believe that everyone should have access to top-notch training. That's why we offer courses in MMA, boxing, jiu-jitsu, and more at incredibly reasonable prices.

Join us to unleash your potential, build discipline, and embrace the world of combat sports. Let's train, grow, and conquer together at FightClub!

Raza Khan
Founder, FightClub"
      />
    </VStack>
  </Stack>
);
const About = () => {
  return (
    <Container padding={'16'} boxShadow={'lg'} maxW={'container.lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m={8} alignItems={'center'} direction={['column', 'row']}>
        <Text
          fontFamily={'cursive'}
          m={8}
          textAlign={['center', 'left']}
          children="FightClub Premium: Unleash Your Potential! Exclusive access to top-notch combat sports courses in MMA, boxing, jiu-jitsu, and more at unbeatable prices. Elevate your skills and become part of the elite!"
        />
        <Link to={'/subscribe'}>
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout our plans
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC termsAndConditions={TermsAndConditions} />
      <HStack my={'4'} p={4}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          textTransform={'uppercase'}
          children="Payment is secured by Razorpay."
        />
      </HStack>
    </Container>
  );
};

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms and Conditions."
      textAlign={['center', 'left']}
      my={4}
    />
    <Box h={'sm'} p={4} overflowY={'scroll'}>
      <Text
        fontFamily={'heading'}
        letterSpacing={'widest'}
        textAlign={['center', 'left']}
      >
        {termsAndConditions}
      </Text>
    </Box>
  </Box>
);
const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      muted
      controlsList="nodownload"
      controls
      loop
      src={video}
    ></video>
  </Box>
);
export default About;
