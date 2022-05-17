import Image from "next/image";

import { signIn } from "next-auth/react";
import { AiFillGithub, AiFillLinkedin} from 'react-icons/ai';
import { Button } from "../Components/util/Button";
import { Link } from "../Components/util/Link";

export default function Home() {

  function handlerSubmit(provider : string){
    signIn(provider , {
      callbackUrl: '/homePage'
    })
  }



  return (
    <div className='h-screen bg-[url(/images/welcome/home-page.jpeg)] bg-center bg-cover bg-no-repeat p-5 flex flex-col'>
      <header className="flex justify-between items-center">
        <Image src={'/images/logo/logo-white.png'} alt='Logo Book Readers' width={300} height={100}/>
        <Button title="Sign In" className="text-white font-semibold text-2xl cursor-pointer hover:text-blue-200 absolute top-5 right-5"/>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold">Welcome to the BookReaders</h1>
        <h2 className="text-2xl">A social network made for those  who love to read</h2>
        <div className="mt-[15px] text-2xl text-center">
          <p>This project was developed in Next.Js, NextAuth, React, Typescript, Prisma, Pscale and Tailwind</p>
          <p>The goal is to simulate a social network with feed, rating and friends systems.</p>
        </div>
      </main>
      <footer>
        <div className="w-[20%] flex flex-col">
          <div className="flex gap-7">
            <Link alt="github-icon"   img="/images/brand-icons/github.png"    url="https://github.com/Igorlabaki"/>
            <Link alt="linkedin-icon" img="/images/brand-icons/linkedin.png"  url="https://www.linkedin.com/in/igor-augusto-labaki-goncalo-b75918199/"/>
            <Link alt="gmail-icon"    img="/images/brand-icons/gmail.png"     url="https://www.linkedin.com/in/igor-augusto-labaki-goncalo-b75918199/"/>
          </div>
          <p className="text-white text-lg">Coded by Igor Gonçalo</p>
        </div>
      </footer>
    </div>
  )
}
