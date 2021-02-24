import
{
  Box,
  Text
} from '@chakra-ui/react';


function TextBox({ children, fullWidth = false })
{
  return (
    <Box
      // border="1px"
      borderColor="yellow"
      bg="transparent"
      p="1rem"
      color="white"
      fontSize="3xl"
      fontWeight="bold"
      textAlign="center"
      minH="81px"
      w={fullWidth && "100%"}
      style={{ boxShadow: "1px 1px 3px yellow, -1px -1px 3px yellow, 1px -1px 3px yellow, -1px 1px 3px yellow, 1px 1px 3px yellow inset, -1px -1px 3px yellow inset, 1px -1px 3px yellow inset, -1px 1px 3px yellow inset" }}
    >

      {children}

    </Box>
  );
}

export default TextBox;