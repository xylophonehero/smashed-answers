import
{
  Box,
  Button,
  Text,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Switch,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router'
import { Link as NextLink } from 'next/link'

function QuizForm(props)
{
  const router = useRouter()

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    const formData = new FormData(e.target)
    const options = Object.fromEntries(formData)
    console.log(options)
    router.push(`/quiz?limit=${options.limit}&sort=${options.sort}&new=${options.new === "" ? true : false}`)
  }

  return (
    <Box maxW="400px">
      <form onSubmit={e => handleSubmit(e)}>
        <VStack spacing="2rem">
          <FormControl id="limit">
            <FormLabel>Number of Questions</FormLabel>
            <NumberInput name="limit" defaultValue={10} min={1} max={20}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="sort">
            <FormLabel>Ordered by:</FormLabel>
            <Select name="sort">
              <option value="published_at:DESC">Most Recent</option>
              <option value="likes:DESC,dislikes:ASC">Top Rated</option>
            </Select>
          </FormControl>
          <FormControl id="new">
            <FormLabel htmlFor="new">New questions</FormLabel>
            <Switch name="new" id="new" defaultChecked />
          </FormControl>
          <Button type="submit">Let's go!</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default QuizForm;