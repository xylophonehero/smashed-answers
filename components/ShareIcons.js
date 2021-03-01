import { HStack, IconButton, Text, useToast, VStack } from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa'
import { SITE_URL } from '../utils/urls'
import { useRef } from 'react'

function ShareIcons({ uid })
{
  const textareaRef = useRef(null)
  const link = `${SITE_URL}/question?uid=${uid}`

  const toast = useToast()

  const handleClick = () =>
  {
    textareaRef.current.select()
    document.execCommand('copy')
    // navigator.clipboard.writeText(link)

    toast({
      title: "Link copied to clipboard",
      status: "success",
      isClosable: true,
    })
  }

  return (
    <HStack>
      <Text fontWeight="bold">Share:</Text>
      <IconButton isRound icon={<FaCopy />} onClick={handleClick} aria-label="copy" size="lg" />
      <textarea ref={textareaRef} value={link} style={{ display: 'none' }} readOnly />
    </HStack>
  );
}

export default ShareIcons;