import Image from "next/image";

import { signIn } from "next-auth/react";
import { AiFillGithub , AiFillLinkedin} from 'react-icons/ai';

import { Button } from "../Components/util/Button";
import { Link } from "../Components/util/Link";
import { useState } from "react";
import { ModalEditComponent } from "../Components/Modals/authModal";

export default function Home() {

  const [modal, setModal] = useState(false)

  function handleOpenModal(){
    setModal(true)
  }

  function handleCloseModal(){
    setModal(false)
  }

  function handlerSubmit(provider : string){
    signIn(provider , {
      callbackUrl: '/homePage'
    })
  }

  return (
    <div className='min-h-screen bg-[url(/images/welcome/home-page.jpeg)] bg-center bg-cover bg-no-repeat p-5 flex flex-col relative'>
      <header className="flex justify-between items-center">
        <Image src={'/images/logo/logo-white.png'} alt='Logo Book Readers' width={300} height={100}/>
        <Button title="Sign In" onClick={handleOpenModal} className="text-white font-semibold text-2xl cursor-pointer hover:text-blue-200 absolute top-5 right-5"/>
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
      {
          modal ? 
            <ModalEditComponent onClose={handleCloseModal}>
                <div className="bg-white w-[50%] flex justify-center items-center flex-col p-14 rounded-lg">
                  <p className="font-bold text-blue-900 text-4xl">Sign in with</p>
                  <div className="w-full mt-7">
                    <button onClick={() => handlerSubmit("github")} className="bg-black w-full text-white text-[1.1rem] font-semibold  flex justify-center items-center rounded-lg space-x-2 p-2">
                      <AiFillGithub size={30}/>
                      <p>GitHub</p>
                    </button>
                  </div>
                </div>  
            </ModalEditComponent> 
          : 
          null
        }
    </div>
  )
}
