import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
const CreateCourse = () => {
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Box></Box>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
