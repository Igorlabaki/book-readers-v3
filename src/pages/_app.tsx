import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GoogleBookContextProvider } from "../Context/GoogleBooksContext";
import { UserContextProvider } from "../Context/UserContext";
import { PostsContextProvider } from "../Context/PostsContext";
import { BookContextProvider } from "../Context/BooksContext";
import { UserBookContextProvider } from "../Context/UserBooksContext";
import { FollowContextProvider } from "../Context/FollowContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <PostsContextProvider>
          <GoogleBookContextProvider>
            <BookContextProvider>
              <UserBookContextProvider>
                <FollowContextProvider>
                  <Component {...pageProps} />
                </FollowContextProvider>
              </UserBookContextProvider>
            </BookContextProvider>
          </GoogleBookContextProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
