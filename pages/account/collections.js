import
{
  Container,
  VStack,
  HStack,
  SimpleGrid
} from '@chakra-ui/react';
import React from 'react';
import AccountMenu from '../../components/AccountMenu';
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { API_URL } from '../../utils/urls'

function Collections({ collections, page, count })
{
  const [session, loading] = useSession()
  const router = useRouter()

  const lastPage = Math.ceil(count / 6)

  const handleNavClick = (page) =>
  {
    router.push(`/account/collections?page=${page}`)
  }

  return (
    <Container>
      <AccountMenu title="My Collections" />
      <VStack spacing="2rem">
        <HStack spacing="2rem">
          {page > 2 && <Button onClick={() => handleNavClick(1)}>First</Button>}
          {page > 1 && <Button onClick={() => handleNavClick(page - 1)}>Prev</Button>}
          {page < lastPage && <Button onClick={() => handleNavClick(page + 1)}>Next</Button>}
          {page < lastPage - 1 && <Button onClick={() => handleNavClick(lastPage)}>Last</Button>}
        </HStack>
        {!!collections ?
          <SimpleGrid columns={[1, null, 2, null, 3]} spacing="2rem">
            {collections.map(collection =>
              <QuestionCard key={collection.id} question={collection} session={session} />
            )}
          </SimpleGrid>
          :
          <p>No Collections</p>
        }
      </VStack>
    </Container>
  );
}

export default Collections;


export async function getServerSideProps(context)
{
  const page = +context.query.page || 1
  const start = (page - 1) * 6

  var collections = []
  const session = await getSession(context)

  const count_res = await fetch(`${API_URL}/collections/user/count`,
    {
      headers: {
        'Authorization': `Bearer ${session.jwt}`
      }
    })
  const count = await count_res.json()

  const res = await fetch(`${API_URL}/collections/user?_limit=6&_start=${start}`,
    {
      headers: {
        'Authorization': `Bearer ${session.jwt}`
      }
    })
  collections = await res.json()

  return {
    props: {
      collections,
      page,
      count
    }
  }
}