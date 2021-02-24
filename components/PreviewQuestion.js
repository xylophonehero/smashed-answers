import TextBox from "./TextBox"
import
{
  Heading,
  Box,
  VStack
} from "@chakra-ui/react"

function PreviewQuestion({ previewRef, answer, textClue })
{


  return (
    <VStack spacing="2rem" maxW="400px">
      <Heading>Question Preview</Heading>
      <Box h="400px" w="400px" bg="yellow" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} border="2px" borderColor="yellow">
        <canvas
          ref={previewRef}
          style={{
            margin: '1%',
            width: '98%',
            height: '98%',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />
      </Box>
      <TextBox fullWidth>{textClue}</TextBox>
      <TextBox fullWidth>{answer.toUpperCase()}</TextBox>
    </VStack>
  );
}

export default PreviewQuestion;