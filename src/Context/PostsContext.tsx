import { Comments, Likes, Posts } from "@prisma/client";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ContextProvider {
  children: ReactNode;
}

interface PostsContext {
  error?: string;
  isLoading?: boolean;

  allPosts?: Posts[];
  setallPosts?: Dispatch<SetStateAction<Posts[]>>;

  post?: any;

  createLike?: (post: Posts, userId: String) => void;
  deleteLike?: (likeId: String) => void;
  getLike?: (postId: String, userId: String) => void;
  liked?: Boolean;
  likeId?: String;

  createPost?: (post: object) => void;
  getPosts?: () => Promise<any>;
  updatePost?: (post: Posts, any, string) => void;
  deletePost?: (post: Posts) => void;

  createBookPost?: (
    postText: string,
    bookInputId: String,
    userInputId: String
  ) => void;

  currentPostPage?: number;
  postsPerPage?: number;
  setCurrentPostPage?: Dispatch<SetStateAction<number>>;
}

export const PostsContext = createContext<PostsContext>({
  isLoading: null,
});

export function PostsContextProvider({ children }: ContextProvider) {
  const [allPosts, setallPosts] = useState<Posts[]>([]);
  const [post, setPost] = useState<Object>();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [liked, setLiked] = useState<Boolean>();
  const [likeId, setLikeId] = useState<String>();

  const [currentPostPage, setCurrentPostPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  function showError(msg, time = 3000) {
    setError(msg);
    setTimeout(() => setError(null), time);
  }

  async function createPost(postInput: Posts) {
    try {
      const post = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(postInput),
      });
      setPost(() => post);
      getPosts();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deletePost(postInput: Posts) {
    try {
      const post = await fetch("/api/post", {
        method: "DELETE",
        body: JSON.stringify(postInput),
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePost(postInput: Posts, changes) {
    const inputInfo = {
      ...postInput,
      text: changes,
    };
    try {
      const post = await fetch("/api/post", {
        method: "PUT",
        body: JSON.stringify(inputInfo),
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getPosts() {
    try {
      const response = await fetch("/api/post");
      const result = await response.json();
      setallPosts(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createBookPost(
    bookInputId: String,
    userInputId: String,
    postText: string
  ) {
    if (postText != "") {
      const postBookInput = {
        bookId: bookInputId,
        userId: userInputId,
        postText: postText,
      };
      try {
        await fetch("/api/post", {
          method: "POST",
          body: JSON.stringify(postBookInput),
        });
        getPosts();
        console.log(allPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      showError("", 3000);
    }
  }

  async function createLike(post: Posts, userId: String) {
    const inputLike = {
      idP: post.id,
      idU: userId,
    };

    try {
      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify(inputLike),
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getLike(postId: String, userId: String) {
    const inputLike = {
      idP: postId,
      idU: userId,
    };

    const url = `/api/like/${postId}/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLike(likeId: String) {
    try {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify(likeId),
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PostsContext.Provider
      value={{
        post,

        createPost,
        updatePost,
        deletePost,

        createLike,
        deleteLike,
        getLike,
        liked,
        likeId,

        createBookPost,

        allPosts,
        setallPosts,

        getPosts,

        error,
        isLoading,

        currentPostPage,
        setCurrentPostPage,
        postsPerPage,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
