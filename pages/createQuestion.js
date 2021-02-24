import { useState, useRef, useCallback } from 'react'
import
{
  Container,
  Flex,
  Box,
  Input,
  InputRightElement,
  Switch,
  FormControl,
  FormLabel,
  Button,
  HStack,
  Text,
  InputGroup,
  Textarea,
  Heading,
  useToast,
  VStack
} from '@chakra-ui/react'

import { API_URL, CORS_PROXY_URL } from '../utils/urls'
import CropImage from '../components/CropImage'
import { useSession } from 'next-auth/client'
import PreviewQuestion from '../components/PreviewQuestion'
import { useRouter } from 'next/router'

function CreateQuestion()
{
  const [textClue, setTextClue] = useState("")
  const [answer, setAnswer] = useState("")
  const [isWorking, setIsWorking] = useState(false)
  const [cropImg, setCropImg] = useState(null)
  const [urlImg, setUrlImg] = useState("")
  const imgRef = useRef(null)
  const previewRef = useRef(null)
  const fileInputRef = useRef(null)
  const [finishedUpload, setFinishedUpload] = useState(false)

  const [session, loading] = useSession()

  const pixelRatio = 1 || window.devicePixelRatio || 1;

  const router = useRouter()
  const toast = useToast()

  const onSelectFile = (e) =>
  {
    if (e.target.files)
    {
      const reader = new FileReader()
      reader.addEventListener("load", () => setCropImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const removeUpload = () =>
  {
    fileInputRef.current.value = ""
    setCropImg(null)
  }

  const handleCrop = (crop) =>
  {
    const image = imgRef.current
    const canvas = previewRef.current

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext("2d")

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = "high"

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault()
    setIsWorking(true)
    const formData = new FormData(e.target)
    const formDataObj = Object.fromEntries(formData.entries())

    //Submit form data under header data
    const questionData = new FormData()
    questionData.append('data', JSON.stringify(formDataObj))

    //Convert blob to file
    const blob = await new Promise(resolve => previewRef.current.toBlob(resolve))
    blob.lastModifiedDate = new Date()
    blob.name = ""
    questionData.append('files.pictureClue', blob)

    //post question to strapi
    try
    {
      const res = await fetch(`${API_URL}/questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.jwt}`
        },
        body: questionData
      })
      const data = await res.json()
      console.log(data)
      setFinishedUpload(true)
      setIsWorking(false)
    } catch (error)
    {
      console.error(error)
      setIsWorking(false)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support",
        status: "error",
        isClosable: true
      })
    }

  }

  return (
    <Container maxW="960px" centerContent>
      <HStack spacing="2rem" wrap="wrap">
        {finishedUpload ?
          <VStack w="400px" spacing="2rem">
            <Heading>Question successfully created! 🥂</Heading>
            <Button onClick={() => router.reload()}>Create another one?</Button>
          </VStack>
          :
          <Box w="400px">
            <Box>
              <CropImage
                image={!!cropImg ? cropImg : `${CORS_PROXY_URL}/${urlImg}`}
                handleCrop={handleCrop}
                imgRef={imgRef}
              />
            </Box>
            <input
              style={{ display: "none" }}
              accept="image/*"
              ref={fileInputRef}
              type="file"
              onChange={e => onSelectFile(e)}
            />
            <Button onClick={() => fileInputRef.current.click()}>Upload Image</Button>
            {!!cropImg && <Button onClick={removeUpload}>Remove Upload</Button>}
            {/* <Input type="file" accept="image/*" onChange={e => onSelectFile(e)} /> */}
            <Text>Or</Text>
            <FormControl isDisabled={isWorking}>
              <FormLabel>URL Image</FormLabel>
              <InputGroup>
                <Input type="text" value={urlImg} onChange={e => setUrlImg(e.target.value)} />
                <InputRightElement width="4.5rem">
                  <Button
                    borderBottomLeftRadius="0px"
                    borderTopLeftRadius="0px"
                    onClick={() => setUrlImg("")}
                  >
                    Reset
                </Button>
                </InputRightElement>
              </InputGroup>

            </FormControl>
            <form autoComplete="off" onSubmit={e => handleSubmit(e)}>
              <FormControl isDisabled={isWorking}>
                <FormLabel htmlFor="textClue">Text Clue</FormLabel>
                <Textarea resize="none" type="text" id="textClue" name="textClue" value={textClue} onChange={(e) => setTextClue(e.target.value)} />
              </FormControl>
              <FormControl isDisabled={isWorking}>
                <FormLabel htmlFor="answer">Answer</FormLabel>
                <Input type="text" id="answer" name="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              </FormControl>
              <FormControl isDisabled={isWorking}>
                <FormLabel htmlFor="public">Make question public</FormLabel>
                <Switch id="public" name="public" />
              </FormControl>
              <Button type="submit" isLoading={isWorking}>
                Submit
            </Button>
            </form>
          </Box>}
        <PreviewQuestion
          previewRef={previewRef}
          answer={answer}
          textClue={textClue}
        />
      </HStack>
    </Container>
  );
}

export default CreateQuestion;