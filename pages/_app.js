import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'
import { AnimatePresence } from 'framer-motion'

const theme = extendTheme({
  components: {
    Container: {
      baseStyle: {
        maxW: { base: '100%', lg: '960px', xl: '1152px' }
      }

    }
  },
  colors: {
    primary: {
      50: "#f7e9e9",
      100: "#e8bdbd",
      200: "#d99191",
      300: "#c96464",
      400: "#ba3838",
      500: "#b22222",
      600: "#8e1b1b",
      700: "#6b1414",
      800: "#470e0e",
      900: "#240707"
    }
  }
})


function MyApp({ Component, pageProps, router })
{
  return (
    <ChakraProvider theme={theme}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
