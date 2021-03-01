// import Image from 'next/image'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'

function DiamondImage({ src, size = 400, onImageLoad })
{
  return (
    <Box
      h={size !== 400 ? `${size}px` : ["200px", "400px"]}
      w={size !== 400 ? `${size}px` : ["200px", "400px"]}
      bg="yellow"
      style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      border="2px"
      borderColor="yellow">
      {/* <Image
        src={src}
        boxSize={`${size}px`}
        onLoad={onImageLoad}
        style={{
          margin: '0.5%',
          width: '99%',
          height: '99%',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        }}
      /> */}
      <div style={{
        margin: '0.5%',
        width: '99%',
        height: '99%',
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      }}>
        <Image
          src={src}
          width={size}
          height={size}
          onLoad={onImageLoad}
        />
      </div>
    </Box>
  );
}

export default DiamondImage;