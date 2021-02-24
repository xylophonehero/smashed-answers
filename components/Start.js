import { useRouter } from 'next/router'
import { useContext } from 'react'
import { QuestionContext } from '../context/questionContext'

import
{
  Button,
} from '@chakra-ui/react'

function Start()
{

  const router = useRouter()
  const { questions, getQuestions } = useContext(QuestionContext)
  const handleSubmit = async (e) =>
  {
    e.preventDefault()
    try
    {
      const firstId = await getQuestions()
      // const id = JSON.parse(localStorage.getItem('questionIds'))[0]

      router.push(`/questions/${firstId}`)
    } catch (error)
    {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type='submit'>Start</Button>
    </form>
  );
}

export default Start;