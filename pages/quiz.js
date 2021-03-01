import { API_URL } from '../utils/urls';
import Quiz from '../components/Quiz';
import { getSession } from 'next-auth/client'

function QuizPage({ questions })
{
  if (!!questions && questions.length > 0)
    return (
      <Quiz
        questions={questions}
      />
    );
  else
  {
    return (
      <p>Something went wrong</p>
    )

  }
}

export default QuizPage;

export async function getServerSideProps(context)
{
  const { query } = context

  const session = await getSession(context)
  let questions_res

  if (query.new === 'true' && !!session)
  {
    questions_res = await fetch(`${API_URL}/questions/unanswered?_limit=${query.limit}&_sort=${query.sort}`, {
      headers: {
        'Authorization': `Bearer ${session.jwt}`
      }
    })
  } else
  {
    questions_res = await fetch(`${API_URL}/questions?_limit=${query.limit}&_sort=${query.sort}`)
  }

  const questions = await questions_res.json()

  return {
    props: { questions }
  }
}