import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"

import { signIn, signOut, useSession } from 'next-auth/client'

import { Link as NextLink } from 'next/link'

import
{
  Box,
  Button,
  Text,
  IconButton,
  Flex,
  Stack,
  Link
} from "@chakra-ui/react"

function Navbar(props)
{

  const [isOpen, setIsOpen] = useState(false)

  const [session, loading] = useSession()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={"blue.300"}
      color={"gray.800"}
    >
      <Box>
        <Link href="/" as={NextLink}>
          <Text fontSize="lg" fontWeight="bold">
            Smashed Answers
          </Text>
        </Link>
      </Box>


      <IconButton
        display={{ md: "none" }}
        onClick={() => setIsOpen(!isOpen)}
        icon={isOpen ? <GrClose /> : <GiHamburgerMenu />}
        aria-label="nev-menu"
        variant="unstyled"
      />
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 0, 0, 0]}
        >
          <MenuItem to="/createQuestion">Create</MenuItem>
          {!session ?
            <>
              <Button onClick={signIn}>Log in</Button>
            </>
            :
            <>
              <MenuItem to="/account">My Account</MenuItem>
              <Button onClick={signOut}>Log Off</Button>
            </>
          }

        </Stack>

      </Box>
    </Flex>
  );
}

const MenuItem = function ({ children, to = "/" })
{
  return (
    <Link as={NextLink} href={to}>
      <Text display="block">
        {children}
      </Text>
    </Link>
  )
}

export default Navbar;