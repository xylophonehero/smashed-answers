import { useState, useRef, useEffect } from 'react';
import { Link as NextLink } from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import
{
  Box,
  Container,
  Input,
  VStack,
  HStack,
  Flex,
  Spacer,
  Button,
  Text,
  Link,
  IconButton,
  Textarea,
} from '@chakra-ui/react';
import DiamondImage from '../components/DiamondImage';
import TextBox from '../components/TextBox';

import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { API_URL } from '../utils/urls';
import { useSession } from 'next-auth/client';

function QuizQuestion({ question, handleNextQuestion, imageLoaded, setImageLoaded, setScore })
{
  const [session, loading] = useSession()
  const inputRef = useRef()

  const [showAnswer, setShowAnswer] = useState(false)

  const [rating, setRating] = useState(0)
  const [questionSessionId, setQuestionSessionId] = useState(null)

  useEffect(() =>
  {
    inputRef.current.focus()
  }, [inputRef])

  useEffect(() =>
  {
    const getQuestionSessionId = async () =>
    {
      try
      {
        const res = await fetch(`${API_URL}/question-sessions/${question.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.jwt}`
          }
        })
        const data = await res.json()
        if (!!data)
        {
          setQuestionSessionId(data.id)
          setRating(data.like)
        }
      } catch (error)
      {
        console.log(error)
      }
    }
    if (!!session && !questionSessionId)
    {
      getQuestionSessionId()
    }
  }, [session, questionSessionId])

  const handleAnswered = async (correct) =>
  {
    try
    {
      if (!questionSessionId && !!session)
      {
        //create question session
        const res = await fetch(`${API_URL}/question-sessions/${question.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.jwt}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correct })
        })
        const data = await res.json()
        setQuestionSessionId(data.id)
        console.log('Session created')
        console.log(data)
      }
      setShowAnswer(true)
    } catch (error)
    {
      console.error(error)
    }
  }

  const submitRating = async (newRating) =>
  {
    if (newRating === rating)
      newRating = 0
    console.log(newRating)
    try
    {
      const res = await fetch(`${API_URL}/question-sessions/${questionSessionId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ like: newRating })
      })
      const data = await res.json()
      console.log(data)
      console.log('Rating updated')
      setRating(newRating)
    } catch (error)
    {
      console.error(error)
    }
  }

  const inputControls = useAnimation()

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    const answer = new FormData(e.target).get("userAnswer")
    if (answer.toUpperCase() === question.answer.toUpperCase())
    {
      setScore(prev => prev + 1)
      handleAnswered(true)
    } else
    {
      console.log("wrong")
      inputControls.start({
        x: ["0vw", "-10vw", "5vw", "-2.5vw", "1vw", "0vw"],
        transition: {
          duration: 0.5
        }
      })
      inputRef.current.focus()
    }

  }

  const imageVariants = {
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0.3, rotate: -90 }
  }

  const boxVariants = {
    visible: {
      scaleX: 1,
      height: "auto",
      transition: { duration: 1, delayChildren: 1 }
    },
    hidden: { scaleX: 0, height: 0 }
  }

  const textVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  const fadeIn = {
    visible: {
      opacity: 1,
      transition: { delay: 1.5 }
    },
    hidden: { opacity: 0 }
  }

  return (
    <VStack
      spacing="2rem"
    >
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={imageLoaded ? "visible" : "hidden"}
      >
        <DiamondImage

          src={question.pictureClue.url}
          onImageLoad={() => setImageLoaded(true)}
        />
      </motion.div>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={imageLoaded ? "visible" : "hidden"}
      >
        <TextBox>
          <motion.div
            variants={textVariants}

          >
            {question.textClue}
          </motion.div>
        </TextBox>

      </motion.div>
      <motion.div
        variants={fadeIn}
        onAnimationStart={() => console.log("started")}
        onAnimationComplete={() => { inputRef.current.focus(); console.log("complete") }}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing="2rem">
            <motion.div
              animate={inputControls}
            >
              <TextBox>
                <Textarea
                  rows="1"
                  resize="none"
                  name="userAnswer"
                  ref={inputRef}
                  variant="unstyled"
                  color="white"
                  fontSize="3xl"
                  fontWeight="bold"
                  textAlign="center"
                  maxLength="100"
                  // w="100%"
                  autoComplete="off"
                  disabled={showAnswer}
                  style={{ textTransform: 'uppercase' }}
                />
              </TextBox>
            </motion.div>
            {!showAnswer && <Flex w="100%">
              <Button type="submit">Submit</Button>
              <Spacer />
              <Button onClick={() => handleAnswered(false)}>Give Up</Button>
            </Flex>}
          </VStack>
        </form>
      </motion.div>
      {showAnswer &&
        <>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
          >
            <TextBox>
              <motion.div
                variants={textVariants}
              >
                <span style={{ textTransform: 'uppercase' }}>{question.answer}</span>
              </motion.div>
            </TextBox>
          </motion.div>
          {/* <TextBox ><span style={{ textTransform: 'uppercase' }}>{question.answer}</span></TextBox> */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          // style={{ width: "100%" }}
          >
            <HStack spacing="2rem">

              <Button onClick={handleNextQuestion}>Next question</Button>

              {/* <Spacer /> */}
              {session && !!questionSessionId &&
                <Box>
                  <IconButton
                    colorScheme={rating === 1 ? "blue" : "gray"}
                    variant="link"
                    size="lg"
                    aria-label="like"
                    icon={<AiFillLike />}
                    onClick={() => submitRating(1)}
                  />
                  <IconButton
                    colorScheme={rating === -1 ? "red" : "gray"}
                    variant="link"
                    size="lg"
                    aria-label="dislike"
                    icon={<AiFillDislike />}
                    onClick={() => submitRating(-1)}
                  />
                </Box>}
              {/* <Spacer /> */}
              <Text color="white">Question by {question.author.username}</Text>
            </HStack>
          </motion.div>
        </>
      }
    </VStack>
  );
}

export default QuizQuestion;