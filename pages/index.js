import { API_URL } from '../utils/urls'
import { Link as NextLink } from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import
{
  Container,
  Heading,
  Text
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import QuizForm from '../components/QuizForm'


export default function Home()
{
  const router = useRouter()

  return (
    <Container centerContent>
      <Heading>Welcome to Smashed Answers</Heading>
      <Text>Select some options to start a quiz</Text>
      <QuizForm />
    </Container>
  )
}
