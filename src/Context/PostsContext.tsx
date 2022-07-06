import { Comments, Posts } from "@prisma/client";

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
  isGetBookLoading?: boolean;

  allPosts?: Posts[];
  setallPosts?: Dispatch<SetStateAction<Posts[]>>;

  post?: any;

  createLike?: (post: Posts, userId: String) => void;
  deleteLike?: (likeId: String) => void;
  getLike?: (postId: String, userId: String) => void;

  createComment?: (post: object, comment: String, userId: string) => void;
  getComments?: (postId: String) => void;
  commentList?: Comments[];

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

  const [commentList, setCommentList] = useState<Comments[]>([]);

  const [currentPostPage, setCurrentPostPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  function showError(msg, time = 3000) {
    setError(msg);
    setTimeout(() => setError(null), time);
  }

  async function createPost(postInput: Posts) {
    setIsLoading(true);
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
    setTimeout(() => setIsLoading(false), 3000);
  }

  async function deletePost(postInput: Posts) {
    setIsLoading(true);
    try {
      const post = await fetch("/api/post", {
        method: "DELETE",
        body: JSON.stringify(postInput),
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 2000);
  }

  async function updatePost(postInput: Posts, changes) {
    setIsLoading(true);
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
    setTimeout(() => setIsLoading(false), 2000);
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
    setIsLoading(true);
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
      } catch (error) {
        console.log(error);
      }
    } else {
      showError("", 3000);
    }
    setTimeout(() => setIsLoading(false), 2000);
  }

  async function createLike(post: Posts, userId: String) {
    const inputLike = {
      idP: post.id,
      idU: userId,
    };

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify(inputLike),
      });
      const result = await response.json();
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getLike(postId: String, userId: String) {
    const url = `/api/like/${postId}/${userId}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLike(likeId: String) {
    try {
      const response = await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify(likeId),
      });
      const result = await response.json();
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function createComment(
    postInput: Posts,
    comment: String,
    userId: string
  ) {
    const info = {
      ...postInput,
      comment: comment,
      user: userId,
    };
    if (postInput.text != "") {
      try {
        await fetch("/api/comment", {
          method: "POST",
          body: JSON.stringify(info),
        });
        getPosts();
      } catch (error) {
        console.log(error);
      }
    } else {
      showError("", 3000);
    }
  }

  async function getComments(postId: String) {
    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setCommentList(result);
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

        createComment,
        getComments,
        commentList,

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
