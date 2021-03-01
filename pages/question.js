import { API_URL } from '../utils/urls'
import Quiz from '../components/Quiz'

function Question({ question })
{
  return (
    <Quiz
      questions={question}
    />
  );
}

export default Question;

export async function getServerSideProps({ query })
{
  let question = []
  const question_res = await fetch(`${API_URL}/questions?uid=${query.uid}`)
  question = await question_res.json()

  return {
    props: { question }
  }
}