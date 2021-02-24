import { useState, createContext } from 'react'
import { API_URL } from '../utils/urls'
import { useRouter } from 'next/router'

export const QuestionContext = createContext()

export const QuestionProvider = ({ children }) =>
{
  const router = useRouter()

  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  //TODO add options for categories/public/unanswered questions
  const getQuestions = async () =>
  {
    try
    {
      const res = await fetch(`${API_URL}/questions`)
      const data = await res.json()
      if (typeof window !== "undefined")
      {
        const questionIds = data.reduce((ids, question) =>
        {
          return [...ids, question.id]
        }, [])
        localStorage.setItem('questionIds', JSON.stringify(questionIds))
        // console.log(JSON.parse(localStorage.getItem('questionIds')))
        localStorage.setItem('questionIndex', 0)
        return questionIds[0]
      }
    } catch (error)
    {
      console.error(error)
    }

  }

  const nextQuestionId = () =>
  {
    if (typeof window !== "undefined")
    {
      const questions = JSON.parse(localStorage.getItem('questionIds'))
      const index = parseInt(localStorage.getItem('questionIndex'))

      if (index + 1 === questions.length)
      {
        return '/finished'
      }

      return questions[index + 1]
    }
  }

  const increaseQuestionIndex = () =>
  {
    if (typeof window !== "undefined")
    {
      const index = localStorage.getItem('questionIndex')
      localStorage.setItem('questionIndex', index + 1)
    }
  }

  const increaseScore = () =>
  {
    setScore(score + 1)
  }

  return (
    <QuestionContext.Provider value={{ questions, getQuestions, nextQuestionId, increaseQuestionIndex, score, increaseScore }}>
      {children}
    </QuestionContext.Provider>
  )
}