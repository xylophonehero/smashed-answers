import Navbar from "./Navbar";
import Footer from "./Footer"
import { Box, Flex } from '@chakra-ui/react'

function Layout({ children })
{
  return (
    <Flex as="div" bg="primary.400" color="grey.600" minH="100vh" flexDir="column">
      <Navbar />
      <Box flex={1} as="main" py="2rem">{children}</Box>
      <Footer />
    </Flex>
  );
}

export default Layout;