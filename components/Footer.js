import
{
  Container,
  Text,
  Link
} from '@chakra-ui/react';
import React from 'react';

function Footer(props)
{
  return (
    <Container>
      <Text>Website create by <Link rel="noopener noreferrer" target="_blank" href="https://nickworrall.co.uk">Nick Worrall</Link></Text>
    </Container>
  );
}

export default Footer;