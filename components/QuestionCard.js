import { useRef, useState } from 'react'
import
{
  Box,
  VStack,
  Text,
  HStack,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
  Input,
  Textarea,
  IconButton,
  Flex,
  Spacer,
  Tooltip,
  Switch
} from '@chakra-ui/react'
import DiamondImage from '../components/DiamondImage';
import { API_URL } from '../utils/urls';
import { FiPlus } from 'react-icons/fi'

function QuestionCard({ question, session })
{
  const [editMode, setEditMode] = useState(false)
  const handleEdit = async (e) =>
  {
    e.preventDefault()
    const userFormData = new FormData(e.target)
    const userinput = Object.fromEntries(userFormData)
    const formData = new FormData()
    formData.append('data', JSON.stringify(userinput))
    try
    {
      const res = await fetch(`${API_URL}/questions/${question.id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${session.jwt}`
        },
        body: formData
      })
      const data = await res.json()
      console.log(data)

      setEditMode(false)
      toast({
        title: "Question updated successfully",
        description: "Congratulations!",
        status: "success",
        isClosable: true,
      })
    } catch (err)
    {
      console.error(err)
      toast({
        title: "Question not edited",
        description: "Please contact support or try again.",
        status: "error",
        isClosable: true,
      })
    }

  }

  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleDelete = async () =>
  {
    try 
    {
      const res = await fetch(`${API_URL}/questions/${question.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.jwt}`
        }
      })
      const data = res.json()
      console.log(data)
      toast({
        title: "Question deleted",
        description: "You should make a new one!",
        status: "success",
        isClosable: true,
      })
    }
    catch (error)
    {
      console.error(error)
      toast({
        title: "Question not deleted",
        description: "Please contact support or try again.",
        status: "error",
        isClosable: true,
      })
    }

  }

  return (
    <>
      {/* <Box
        bgColor="white"
        p="1rem"
        boxShadow="xl"
        borderRadius="20px"
      // maxW="580px"
      >{editMode ?
        <form onSubmit={handleEdit} width="100%">
          <HStack spacing="1rem" justify="stretch">
            <DiamondImage size="150" src={question.pictureClue.url} />
            <VStack align="start">
              <Text fontWeight="semibold">Text Clue:</Text>
              <Textarea defaultValue={question.textClue} name="textClue" />
              <Text fontWeight="semibold">Answer:</Text>
              <Input defaultValue={question.answer} name="answer" />
            </VStack>
            <VStack spacing="1rem" align="stretch">
              <Button type="submit">Confrim</Button>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
            </VStack>
          </HStack>
        </form>
        :
        <HStack spacing="1rem" justify="stretch">
          <DiamondImage size="150" src={question.pictureClue.url} />
          <VStack align="start" maxW="300px">
            <Text fontWeight="semibold">Text Clue:</Text>
            <Text> {question.textClue}</Text>
            <Text fontWeight="semibold">Answer:</Text>
            <Text>{question.answer}</Text>
          </VStack>
          <VStack spacing="1rem" align="stretch">
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <Button onClick={onOpen}>Delete</Button>
          </VStack>


        </HStack>
        }

      </Box> */}
      <Box
        bgColor="white"
        p="1rem"
        boxShadow="xl"
        borderRadius="20px"
        w="320px"
        mx="auto"
      >


        {editMode ?
          <VStack as="form" onSubmit={handleEdit} justifyContent="space-between" height="full">
            <Flex w="100%">
              <Box w="3rem">
                <Text fontWeight="bold">Public</Text>
                <Switch name="public" defaultChecked={true} />
              </Box>
              <Spacer />
              <DiamondImage size="150" src={question.pictureClue.url} />
              <Spacer />
              <IconButton icon={<FiPlus />} />
            </Flex>
            <Textarea defaultValue={question.textClue} name="textClue" />
            <Input defaultValue={question.answer} name="answer" />
            <Flex
              w="100%"
            >
              <Button colorScheme="green" type="submit">Confrim</Button>
              <Spacer />
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
            </Flex>

          </VStack>
          :
          <VStack justifyContent="space-between" height="full">
            <Flex w="100%">
              <Tooltip hasArrow label={`I am a ${true ? 'public' : 'private'} question`} aria-label="A tooltip">
                <Box
                  w="3rem"
                  h="3rem"
                  borderRadius="1.5rem"
                  borderWidth="0.5rem"
                  borderColor="blue.100"
                  bgColor="green"
                />
              </Tooltip>
              <Spacer />
              <DiamondImage size="150" src={question.pictureClue.url} />
              <Spacer />
              <IconButton icon={<FiPlus />} />
            </Flex>
            <Text>{question.textClue}</Text>
            <Text fontWeight="700">{question.answer}</Text>
            <Flex
              w="100%"
            >
              <Button onClick={() => setEditMode(true)}>Edit</Button>
              <Spacer />
              <Button colorScheme="red" onClick={onOpen}>Delete</Button>
            </Flex>

          </VStack>
        }

      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this question?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={handleDelete} colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default QuestionCard;
