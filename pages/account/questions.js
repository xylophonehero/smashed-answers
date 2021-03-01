import { useEffect, useState, useRef } from 'react';
import { API_URL } from '../../utils/urls';
import { useRouter } from 'next/router';

import { useSession, getSession } from 'next-auth/client'

import
{

  Container,
  Heading,
  Flex,
  VStack,
  Button,
  SimpleGrid,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem

} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

import QuestionCard from '../../components/QuestionCard';
import AccountMenu from '../../components/AccountMenu';

function Questions({ questions, page, count, searchTerm })
{
  const [session, loading] = useSession()
  const router = useRouter()

  const [userSearch, setUserSearch] = useState(searchTerm || "")

  const lastPage = Math.ceil(count / 6)

  const handleNavClick = (page) =>
  {
    router.push(`/account/questions?page=${page}&search=${userSearch}`)
  }

  const handleSearch = () =>
  {
    router.push(`/account/questions?search=${userSearch}`)
  }

  return (
    <Container>
      <AccountMenu title="My Questions" />
      <VStack spacing="2rem">
        <Grid
          gap="1rem"
          templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(2,1fr) max-content repeat(2,1fr)"]}
          templateRows={["repeat(3,1fr)", "repeat(2,1fr)", "1fr"]}
        >
          <GridItem>
            <Button w="full" disabled={page < 2} onClick={() => handleNavClick(1)}>First</Button>

          </GridItem>
          <GridItem colStart={[1, 2, 2]} rowStart={[2, 1, 1]}>
            <Button width="full" disabled={page < 2} onClick={() => handleNavClick(page - 1)}>Prev</Button>

          </GridItem>

          <GridItem colStart={[2, 3, 4]} rowStart={[1, 1, 1]}>
            <Button w="full" disabled={page === lastPage} onClick={() => handleNavClick(page + 1)}>Next</Button>

          </GridItem >
          <GridItem colStart={[2, 4, 5]} >
            <Button w="full" disabled={page === lastPage} onClick={() => handleNavClick(lastPage)}>Last</Button>
          </GridItem>
          <GridItem colStart={[1, 1, 3]} colSpan={[2, 4, 1]} rowStart={[3, 2, 1]}>
            <InputGroup >
              <Input placeholder="Search by answer" value={userSearch} onChange={e => setUserSearch(e.target.value)} />
              <InputRightElement>
                <IconButton icon={< FaSearch />} borderLeftRadius={0} onClick={handleSearch} />
              </InputRightElement>
            </InputGroup>
          </GridItem>
        </Grid>
        {session && !!questions ?

          questions.length > 1 ?
            <SimpleGrid columns={[1, null, 2, null, 3]} spacing="2rem">
              {questions.map(question =>
                <QuestionCard key={question.id} question={question} session={session} />
              )}
            </SimpleGrid>
            :
            <p>No questions to display</p>
          :
          <p>Please log in </p>
        }
      </VStack>
    </Container>
  );
}

export default Questions

export async function getServerSideProps(context)
{
  const page = +context.query.page || 1
  const start = (page - 1) * 6

  const searchTerm = context.query.search || ""

  var questions = []
  const session = await getSession(context)

  const count_res = await fetch(`${API_URL}/questions/user/count?answer_contains=${searchTerm}`,
    {
      headers: {
        'Authorization': `Bearer ${session.jwt}`
      }
    })
  const count = await count_res.json()

  const res = await fetch(`${API_URL}/questions/user?_limit=6&_start=${start}&answer_contains=${searchTerm}`,
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
      count,
      searchTerm
    }
  }
}