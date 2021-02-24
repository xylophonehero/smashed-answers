import { Container } from '@chakra-ui/react';


function Collection({ name, questions })
{
  return (
    <Container>
      <TextBox>Name</TextBox>
      <Quiz
        questions={questions}
      />
    </Container>
  );
}

export default Collection;

export async function getServerSideProps(context)
{
  const { id } = context.query

  const question_res = await fetch(`${API_URL}/collections/${id}`)
  const data = await question_res.json()

  return {
    props: {
      name: data.name,
      questions: data.questions
    }
  }
}