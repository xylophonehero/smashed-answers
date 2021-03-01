import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { API_URL } from '../../../utils/urls'

// const parse = require('pg-connection-string').parse

// const getCredentials = async () =>
// {
//   const res = await fetch(`https://api.heroku.com/addons/${process.env.HEROKU_POSTGRES_INSTANCE}/config`, {
//     headers: {
//       Authorization: `Bearer ${process.env.HEROKU_API_KEY}`,
//       Accept: "application/vnd.heroku+json; version=3",
//     }
//   })
//   const data = await res.json()
//   const pgConnStr = data[0].value
//   const config = parse(pgConnStr)
//   const database = {
//     type: "postgres",
//     host: config.host,
//     port: config.port,
//     database: config.database,
//     username: config.user,
//     password: config.password,
//     ssl: true,
//     extra: {
//       ssl: {
//         rejectUnauthorized: false,
//       }
//     }
//   }
//   return database
// }

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  jwt: true,
  callbacks: {
    session: async (session, user) =>
    {
      session.jwt = user.jwt
      session.id = user.id
      return Promise.resolve(session)
    },
    jwt: async (token, user, account) =>
    {
      const isSignIn = user ? true : false
      if (isSignIn)
      {
        const response = await fetch(
          `${API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        )
        const data = await response.json()
        token.jwt = data.jwt
        token.id = data.id
      }
      return Promise.resolve(token)
    }
  },
}

export default async (req, res) => NextAuth(req, res,
  options
  // database: await getCredentials()
);