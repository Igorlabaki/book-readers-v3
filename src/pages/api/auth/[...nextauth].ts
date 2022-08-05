import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import CredentialProvider from "next-auth/providers/credentials"
import {prisma} from "../../../../lib/prisma"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
        }
      },
      profile(profile){
        return{
          id: profile.id.toString(),
          username: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      }
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({session, user}) => ({
      ...session,
      user:{
        ...session.user,   
        ...user
      }
    })
  }
}

export default NextAuth(authOptions)