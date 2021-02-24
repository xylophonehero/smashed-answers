import { Container, Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router'
import QuizQuestion from '../components/QuizQuestion'
import { useSession } from 'next-auth/client';

function Quiz({ questions })
{

  const router = useRouter()
  const [session, loading] = useSession()

  const [questionIndex, setQuestionIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const [score, setScore] = useState(0)

  const handleNextQuestion = () =>
  {
    if (questionIndex < questions.length - 1)
    {
      setQuestionIndex(questionIndex + 1)
    } else
    {
      // Different route for collections
      router.push(`/finished?score=${score}&questions=${questions.length}`)
    }
  }

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { x: "-100vw" }
  }
  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={questions[questionIndex].id}
          variants={variants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          exit="exit"
        >
          <QuizQuestion
            setScore={setScore}
            question={questions[questionIndex]}
            handleNextQuestion={handleNextQuestion}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}

export default Quiz;