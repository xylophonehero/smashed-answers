import Navbar from "./Navbar";
import Footer from "./Footer"
import { Box } from '@chakra-ui/react'

function Layout({ children })
{
  return (
    <Box as="div" bg="primary.500" color="grey.600">
      <Navbar />
      <Box as="main" py="2rem">{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;