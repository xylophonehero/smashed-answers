import { API_URL } from '../utils/urls';
import Quiz from '../components/Quiz';

function QuizPage({ questions })
{
  return (
    <Quiz
      questions={questions}
    />
  );
}

export default QuizPage;

export async function getServerSideProps({ query })
{
  console.log(query.new)
  const questions_res = await fetch(`${API_URL}/questions?_limit=${query.limit}&_sort=${query.sort}`)
  const questions = await questions_res.json()

  return {
    props: { questions }
  }
}