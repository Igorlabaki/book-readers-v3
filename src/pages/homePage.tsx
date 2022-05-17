import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react'
import { ImExit } from 'react-icons/im';

export default function HomePage() {

    const {data: session} = useSession() 
    
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="flex border-2 rounded-lg p-4 bg-blue-100">
            <img src={session?.user?.image} className='h-24 w-24 rounded-full' alt="avatar user"/>
            <div className="ml-5">
              <h3 className="text-3xl font-bold">Seja Bem vindo!</h3>
              <p className="font-bold">{session?.user?.name}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">{session?.user?.email}</p>
                <ImExit onClick={() => signOut()} className='text-red-700  cursor-pointer'/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session
    }
  }
}
