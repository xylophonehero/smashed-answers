import
{
  Heading,
  Text,
  Container
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router'
import QuizForm from '../components/QuizForm';

function Finished()
{
  const router = useRouter()

  return (
    <Container centerContent>
      <Heading>All done</Heading>
      <Text>You got {`${router.query.score} out of ${router.query.questions}`}</Text>
      <Text>Play again?</Text>
      <QuizForm />
    </Container>
  );
}

export default Finished;