import Image from "next/image";

import { signIn } from "next-auth/react";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../Components/util/Button";
import { Link } from "../Components/util/Link";
import { useState } from "react";
import { ModalEditComponent } from "../Components/Modals/authModal";
import usePostsContext from "../Hooks/usePostsContext";
import useUserContext from "../Hooks/useUserContext";

export default function Home() {
  const [modal, setModal] = useState(false);

  function handleOpenModal() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  function handlerSubmit(provider: string) {
    signIn("github");
  }

  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("This is not a valid email"),
      username: yup.string().required("Username is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters.")
        .max(12, "Password limit chars is 12"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = (data) => console.log(data);
  const onRegister = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-[url(/images/welcome/home-page.jpeg)] bg-center bg-cover bg-no-repeat p-5 flex flex-col relative">
      <header className="flex justify-between items-center">
        <Image
          src={"/images/logo/logo-white.png"}
          alt="Logo Book Readers"
          width={200}
          height={100}
        />
        <Button
          title="Sign In"
          onClick={handleOpenModal}
          className="text-white font-semibold text-2xl cursor-pointer hover:text-blue-200 absolute top-5 right-5"
        />
      </header>
      <main className="flex-1 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">Welcome to the BookReaders</h1>
        <h2 className="text-lg">
          A social network made for those who love to read
        </h2>
        <div className="mt-[15px] text-lg text-center">
          <p>
            This project was developed in Next.Js, NextAuth, React, Typescript,
            Prisma, Pscale and Tailwind
          </p>
          <p>
            The goal is to simulate a social network with feed, rating and
            friends systems.
          </p>
        </div>
      </main>
      <footer>
        <div className="w-[20%] flex flex-col">
          <div className="flex gap-2">
            <Link
              alt="github-icon"
              img="/images/brand-icons/github.png"
              url="https://github.com/Igorlabaki"
            />
            <Link
              alt="linkedin-icon"
              img="/images/brand-icons/linkedin.png"
              url="https://www.linkedin.com/in/igor-augusto-labaki-goncalo-b75918199/"
            />
            <Link
              alt="gmail-icon"
              img="/images/brand-icons/gmail.png"
              url="https://www.linkedin.com/in/igor-augusto-labaki-goncalo-b75918199/"
            />
          </div>
          <p className="text-white text-lg text-center">
            Coded by Igor Gonçalo
          </p>
        </div>
      </footer>
      {modal ? (
        <ModalEditComponent onClose={handleCloseModal}>
          <div className="bg-white w-[80%] flex justify-center items-center flex-col py-5 px-3 rounded-lg">
            <p className="font-bold text-blue-900 text-4xl">Sign in with</p>
            <form onSubmit={handleSubmit(onLogin)} className={"w-[80%]"}>
              {errors?.email || errors?.password ? (
                <div>
                  <p>{}</p>
                  <p>{}</p>
                </div>
              ) : null}
              <div className="space-y-3">
                <div className="flex flex-col mt-10 ">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    {...register("email")}
                    className={`${
                      errors.email ? "border-error" : null
                    } outline-none focus:bg-blue-100 p-2 rounded-md bg-bg-gray`}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter your password..."
                    {...register("password")}
                    className={`${errors.password ? "border-error" : null} 
                    outline-none focus:bg-blue-200 p-2 rounded-md bg-bg-gray w-[100%]`}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="flex space-x-1">
                  <p className="text-[13px]  font-semibold text-black">
                    Are you new here?
                  </p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    title="Create an account."
                    className="text-[13px] font-semibold text-blue-900 hover:animate-pulse hover:font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  icon={<AiOutlineMail />}
                  title="Email account"
                  disabled={errors ? true : false}
                  className={`w-[100%] bg-blue-900 shadow-pattern hover:shadow-none hover:brightness-110  text-white text-[1.1rem] font-semibold  flex justify-center items-center rounded-lg space-x-2 p-2`}
                />
                <Button
                  title="GitHub"
                  className="bg-black shadow-pattern hover:shadow-none hover:brightness-110   w-[100%] m-auto text-white text-[1.1rem] font-semibold  flex justify-center items-center rounded-lg space-x-2 p-2"
                  icon={<AiFillGithub size={30} />}
                  onClick={() => handlerSubmit("github")}
                />
              </div>
            </form>
          </div>
        </ModalEditComponent>
      ) : null}
    </div>
  );
}
