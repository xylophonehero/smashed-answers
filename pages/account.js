import { useEffect, useState, useRef } from 'react';
import { API_URL } from '../utils/urls';
import { useRouter } from 'next/router';

import { useSession, getSession } from 'next-auth/client'

import
{

  Container,
  Heading,
  HStack,
  VStack,
  Button

} from '@chakra-ui/react'

import QuestionCard from '../components/QuestionCard';

function Account({ questions, page, count })
{
  const [session, loading] = useSession()
  const router = useRouter()

  const lastPage = Math.ceil(count / 5)

  const handleNavClick = (page) =>
  {
    router.push(`/account?page=${page}`)
  }

  return (
    <Container>
      <Heading>My Account</Heading>
      <HStack spacing="2rem">
        {page > 2 && <Button onClick={() => handleNavClick(1)}>First</Button>}
        {page > 1 && <Button onClick={() => handleNavClick(page - 1)}>Prev</Button>}
        {page < lastPage && <Button onClick={() => handleNavClick(page + 1)}>Next</Button>}
        {page < lastPage - 1 && <Button onClick={() => handleNavClick(lastPage)}>Last</Button>}
      </HStack>
      {session ?
        <VStack spacing="2rem">
          {questions.map(question =>
            <QuestionCard key={question.id} question={question} session={session} />
          )}
        </VStack>
        :
        <p>Please log in </p>
      }


    </Container>
  );
}

export default Account

export async function getServerSideProps(context)
{
  const page = +context.query.page || 1
  const start = (page - 1) * 5

  var questions = []
  const session = await getSession(context)

  const count_res = await fetch(`${API_URL}/questions/user/count`,
    {
      headers: {
        'Authorization': `Bearer ${session.jwt}`
      }
    })
  const count = await count_res.json()

  const res = await fetch(`${API_URL}/questions/user?_limit=5&_start=${start}`,
    {
      headers: {
        'Authorization': `Bearer ${session.jwt}`
      }
    })
  questions = await res.json()

  return {
    props: {
      questions,
      page,
      count
    }
  }
}