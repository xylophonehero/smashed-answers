import { useEffect, useRef, useState, useContext } from 'react';
import { Link as NextLink } from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { API_URL } from '../../utils/urls';
import
{
  Container,
  Input,
  VStack,
  Flex,
  Spacer,
  Button,
  Text,
  Link,
} from '@chakra-ui/react';
import DiamondImage from '../../components/DiamondImage';
import TextBox from '../../components/TextBox';
import { QuestionContext } from '../../context/questionContext';

function Question({ question })
{
  const { nextQuestionId, increaseQuestionIndex, increaseScore } = useContext(QuestionContext)
  const nextId = nextQuestionId()

  const [imageLodaed, setImageLoaded] = useState(false)
  const inputRef = useRef()
  // console.log(imageLodaed)

  const [showAnswer, setShowAnswer] = useState(false)

  const inputControls = useAnimation()
  const handleSubmit = (e) =>
  {
    e.preventDefault()
    const answer = new FormData(e.target).get("userAnswer")
    if (answer.toLowerCase() === question.answer.toLowerCase())
    {
      increaseScore()
      setShowAnswer(true)
    } else
    {
      console.log("wrong")
      inputControls.start({
        x: ["-10vw", "5vw", "-2.5vw", "1vw", 0],
        transition: {
          duration: 1
        }
      })
    }

  }

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { x: "-100vw" }
  }

  const imageVariants = {
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0.5, rotate: -90 }
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
    visible: { opacity: 1, transition: { delay: 1.5 } },
    hidden: { opacity: 0 }
  }




  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={imageLodaed ? "visible" : "hidden"}
      exit="exit"
    >
      <Container centerContent py="3rem">
        <VStack
          spacing="2rem"
        >
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={imageLodaed ? "visible" : "hidden"}
          >
            <DiamondImage

              src={question.pictureClue.url}
              onImageLoad={() => setImageLoaded(true)}
            />
          </motion.div>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate={imageLodaed ? "visible" : "hidden"}
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
            onAnimationComplete={() => inputRef.current.focus()}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing="2rem">
                <motion.div
                  animate={inputControls}
                >
                  <TextBox>
                    <Input
                      name="userAnswer"
                      ref={inputRef}
                      variant="unstyled"
                      color="white"
                      fontSize="3xl"
                      fontWeight="bold"
                      textAlign="center"
                      maxLength="100"
                      w="100%"
                      autoComplete="off"
                      disabled={showAnswer}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </TextBox>
                </motion.div>
                {!showAnswer && <Flex w="100%">
                  <Button type="submit">Submit</Button>
                  <Spacer />
                  <Button onClick={() => setShowAnswer(true)}>Give Up</Button>
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
              <Flex w="100%">
                <Link as={NextLink} href={nextId === '/finished' ? '/finished' : `/questions/${nextId}`}>
                  <Button onClick={() => increaseQuestionIndex()}>Next question</Button>
                </Link>
                <Spacer />
                <Text color="white">Question by {question.author.username}</Text>
              </Flex>
            </>
          }
        </VStack>
      </Container>
    </motion.div>
  );
}

export default Question;

export async function getServerSideProps(context)
{

  const { id } = context.query

  const question_res = await fetch(`${API_URL}/questions/${id}`)
  const question = await question_res.json()

  return {
    props: { question: question }
  }
}