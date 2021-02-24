import
{
  Text,
  Link
} from "@chakra-ui/react"
import { Link as NextLink } from "next/link"

function NotFound(props)
{
  return (
    <div>
      <Text>Oops that page cannot be found</Text>
      <Text>Back to <Link as={NextLink} href='/'>Homepage</Link></Text>
    </div>
  );
}

export default NotFound;