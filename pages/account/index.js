import { Text, Container } from '@chakra-ui/react'
import AccountMenu from '../../components/AccountMenu';

function Account()
{
  return (
    <Container>
      <AccountMenu title="My Account" />
      <Text>{100} questions answered</Text>
      <Text>{50} of them correct</Text>
    </Container>
  );
}

export default Account;