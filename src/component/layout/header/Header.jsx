import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';
const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        zIndex={'overlay'}
        colorScheme="yellow"
        position="fixed"
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay backdropFilter="blur(3px)" />
        <DrawerContent>
          <DrawerHeader children="FIGHT CLUB" />
          <DrawerBody>
            <VStack spacing={'3px'} alignItems={'flex-start'}>
              <SidebarButton onClose={onClose} url="/" title="Home" />
              <SidebarButton
                onClose={onClose}
                url="/courses"
                title="Browse all courses"
              />
              <SidebarButton
                onClose={onClose}
                url="/request"
                title="Request a course"
              />
              <SidebarButton
                onClose={onClose}
                url="/contact"
                title="Contact us"
              />
              <SidebarButton onClose={onClose} url="/about" title="About us" />
              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to={'/profile'}>
                          <Button variant={'ghost'} colorScheme="yellow">
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>
                      {user?.role === 'admin' && (
                        <Link onClick={onClose} to={'/admin/dashboard'}>
                          <Button variant={'ghost'} colorScheme="purple">
                            <RiDashboardFill style={{ margin: '4px' }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to={'/login'}>
                      <Button colorScheme="yellow">Login</Button>
                    </Link>

                    <p>OR</p>
                    <Link onClick={onClose} to={'/register'}>
                      <Button colorScheme="yellow">Sign up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
function SidebarButton({ url = '/', title = 'Home', onClose }) {
  return (
    <Link onClick={onClose} to={url}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
}
export default Header;
