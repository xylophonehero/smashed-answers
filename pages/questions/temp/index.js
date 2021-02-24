import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { API_URL } from '../../../utils/urls';
import
{
  Container,
  Input,
  VStack,
  Flex,
  Spacer,
  Button
} from '@chakra-ui/react';
import DiamondImage from '../../../components/DiamondImage';
import TextBox from '../../../components/TextBox';

function Questions(props)
{
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [imageLodaed, setImageLoaded] = useState(false)
  console.log(imageLodaed)

  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() =>
  {
    async function getQuestions()
    {
      const res = await fetch(`${API_URL}/questions`)
      const data = await res.json()
      setQuestions(data)
      console.log(data)
    }
    getQuestions()
    // inputRef.current.focus()
  }, [])

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    const answer = new FormData(e.target).get("userAnswer")
    if (answer.toLowerCase() === questions[questionIndex].answer.toLowerCase())
    {
      setShowAnswer(true)
    } else
    {
      console.log("wrong")
    }

  }

  const handleNextQuestion = () =>
  {
    if (questionIndex < questions.length - 1)
    {
      setImageLoaded(false)
      setShowAnswer(false)
      setQuestionIndex(questionIndex + 1)
    } else
    {
      console.log("no more questions")
    }
  }

  const MotionVStack = motion.custom(VStack)

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  return (
    <Container centerContent py="3rem">
      {questions.length > 0 &&
        <MotionVStack
          variants={variants}
          initial="hidden"
          animate={imageLodaed ? "visible" : "hidden"}
          spacing="2rem"
        >
          <DiamondImage
            src={questions[questionIndex].pictureClue.url}
            onImageLoad={() => setImageLoaded(true)}
          />
          <TextBox >{questions[questionIndex].textClue}</TextBox>

          <form onSubmit={handleSubmit}>
            <TextBox>
              <Input
                name="userAnswer"
                autoFocus
                variant="unstyled"
                color="white"
                fontSize="3xl"
                fontWeight="bold"
                textAlign="center"
                disabled={showAnswer}
              />
            </TextBox>
            <Flex w="100%">
              <Button type="submit">Submit</Button>
              <Spacer />
              <Button onClick={() => setShowAnswer(true)}>Give Up</Button>
            </Flex>
          </form>
          {showAnswer &&
            <>
              <TextBox>{questions[questionIndex].answer}</TextBox>
              <Flex>
                <Button onClick={handleNextQuestion}>Next question</Button>
                <Spacer />
                <Text>Question submitted by {quetsion.author.username}</Text>
              </Flex>
            </>
          }


        </MotionVStack>
      }
    </Container>
  );
}

export default Questions;