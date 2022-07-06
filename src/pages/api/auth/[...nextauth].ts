import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {prisma} from "../../../../lib/prisma"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
        id:        user.id,
        books:     user.books || [],      
        posts:     user.posts || [],    
        comments:  user.comments || [],   
        likes:     user.likes || [],   
      }
    })
  }
}

export default NextAuth(authOptions)