import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {prisma} from "../../../../lib/prisma"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
  secret: process.env.NEXTAUTH_SECRET,
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