import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import video from '../../assets/videos/intro.mp4';

const CourseDetail = () => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: 12,
      title: 'Sample',
      description: 'Samplesdsd sdsjdbjabjas asjasa asja',
      video: {
        url: 'sasasasassd',
      },
    },
    {
      _id: 11,
      title: 'Sample',
      description: 'Samplesdsd sdsjdbjabjas asjasa asja',
      video: {
        url: 'sasasasassd',
      },
    },
    {
      _id: 2,
      title: 'Sample',
      description: 'Samplesdsd sdsjdbjabjas asjasa asja',
      video: {
        url: 'sasasasassd',
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          controlsList="nodownload"
          controls
          loop
          src={video}
        ></video>
        <Heading
          m="4"
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        />

        <Heading m="4" children="Description" />
        <Text m="4" children={lectures[lectureNumber].description} />
      </Box>
      <VStack>
        {lectures.map((element, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={element._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {element.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CourseDetail;
