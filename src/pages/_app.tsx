import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GoogleBookContextProvider } from "../Context/GoogleBooksContext";
import { UserContextProvider } from "../Context/UserContext";
import { PostsContextProvider } from "../Context/PostsContext";
import { BookContextProvider } from "../Context/BooksContext";
import { UserBookContextProvider } from "../Context/UserBooksContext";
import { FollowContextProvider } from "../Context/FollowContext";
<<<<<<< HEAD
import { NotificationContextProvider } from "../Context/NotificationContext";
=======
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <PostsContextProvider>
          <GoogleBookContextProvider>
            <BookContextProvider>
<<<<<<< HEAD
              <NotificationContextProvider>
                <UserBookContextProvider>
                  <FollowContextProvider>
                    <Component {...pageProps} />
                  </FollowContextProvider>
                </UserBookContextProvider>
              </NotificationContextProvider>
=======
              <UserBookContextProvider>
                <FollowContextProvider>
                  <Component {...pageProps} />
                </FollowContextProvider>
              </UserBookContextProvider>
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
            </BookContextProvider>
          </GoogleBookContextProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
