import React from 'react';
import { Button, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/bg.png';
import video from '../../assets/videos/intro.mp4';
const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
        >
          <VStack
            width="full"
            alignItems={['center', 'flex-end']}
            textAlign={['center', 'right']}
          >
            <Heading children="UNLEASH YOUR INNER WARRIOR!" size="2xl" />
            <Text children="Step into the World of MMA, Boxing, Karate, Taekwondo, and More!" />
            <Link to="/courses">
              <Button size="lg" colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="logo-animation"
            boxSize="md"
            src={logo}
            objectFit={'contain'}
          />
        </Stack>
      </div>
      <div className="container2">
        <video
          autoPlay
          muted
          controlsList="nodownload"
          controls
          loop
          src={video}
        ></video>{' '}
      </div>
    </section>
  );
};

export default Home;
