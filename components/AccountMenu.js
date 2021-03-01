import { Flex, Link, VStack, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import { Link as NextLink } from 'next/link'


function AccountMenu({ title })
{
  return (
    <VStack spacing="2rem">
      <Heading>{title}</Heading>
      <SimpleGrid spacingX="2rem" spacingY="0.5rem" columns={[2, 4]}>
        <Link as={NextLink} href="/account">Stats</Link>
        <Link as={NextLink} href="/account/questions">Questions</Link>
        <Link as={NextLink} href="/account/collections">Collections</Link>
        <Link as={NextLink} href="/account/settings">Settings</Link>
      </SimpleGrid>
    </VStack>
  );
}

export default AccountMenu;