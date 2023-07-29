import React, { useEffect } from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';
import Loader from '../../layout/Loader/Loader';
const Users = () => {
  const { users, loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const updateHandler = userId => {
    dispatch(updateUserRole(userId));
  };
  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  return (
    <Grid
      fontFamily={'mono'}
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {loading || !users ? (
        <Loader color="purple.500" />
      ) : (
        <Box p={['0', '16']} overflowX="auto">
          {users ? (
            <>
              <Heading
                fontFamily={'monospace'}
                textTransform={'uppercase'}
                children="All Users"
                my="16"
                textAlign={['center', 'left']}
              />

              <TableContainer w={['100vw', 'full']}>
                <Table variant={'simple'} size="lg">
                  <TableCaption>
                    All available users in the database
                  </TableCaption>

                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Subscription</Th>
                      <Th isNumeric>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {users &&
                      users.map(item => (
                        <Row
                          deleteButtonHandler={deleteButtonHandler}
                          updateHandler={updateHandler}
                          key={item._id}
                          item={item}
                          loading={loading}
                        />
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              {' '}
              <Box
                position="relative"
                boxShadow={'lg'}
                borderRadius={'lg'}
                padding="10"
                mt={'20vh'}
              >
                <Divider />
                <AbsoluteCenter fontFamily={'mono'} px="4">
                  No video
                </AbsoluteCenter>
              </Box>
            </>
          )}
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr fontFamily={'mono'}>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active' ? (
          <HStack>
            <div
              style={{
                backgroundColor: 'green',
                borderRadius: '100%',
                height: '10px',
                width: '10px',
              }}
            />
            <Text children="Active" fontSize={'xs'} />
          </HStack>
        ) : (
          <HStack>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '100%',
                height: '10px',
                width: '10px',
              }}
            />
            <Text children="Not Active" fontSize={'xs'} />
          </HStack>
        )}
      </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => {
              updateHandler(item._id);
            }}
            isLoading={loading}
            variant={'outline'}
            color="purple.500"
          >
            Change Role
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button color={'purple.600'}>
                <RiDeleteBin7Fill />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              mr={'10px'}
              w={['30vh', '40vh']}
              whiteSpace={'normal'}
              textAlign={'left'}
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
              <PopoverBody>
                <Button
                  w={'full'}
                  onClick={() => deleteButtonHandler(item._id)}
                  isLoading={loading}
                  colorScheme="yellow"
                >
                  Yes
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Td>
    </Tr>
  );
}
export default Users;
