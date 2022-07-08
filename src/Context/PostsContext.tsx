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
  isLikeLoading?: boolean;
  isGetBookLoading?: boolean;

  createLike?: (post: Posts, userId: String) => void;
  deleteLike?: (likeId: String) => void;
  getLike?: (postId: String, userId: String) => void;

  createComment?: (post: object, comment: String, userId: string) => void;
  getComments?: (postId: String) => void;
  deleteComment?: (commentId: String) => void;
  updateComment?: (comment: Comments, text: String) => void;
  commentList?: Comments[];

  post?: any;
  createPost?: (post: object) => void;
  getPosts?: () => Promise<any>;
  updatePost?: (post: Posts, text: String) => void;
  deletePost?: (postId: String) => void;
  setallPosts?: Dispatch<SetStateAction<Posts[]>>;
  allPosts?: Posts[];

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

  const [isLikeLoading, setisLikeLoading] = useState(false);

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

  async function deletePost(postId: String) {
    setIsLoading(true);
    try {
      const post = await fetch("/api/post", {
        method: "DELETE",
        body: JSON.stringify(postId),
      });
      console.log(post);
      getPosts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 2000);
  }

  async function updatePost(postInput: Posts, text: String) {
    setIsLoading(true);
    const inputInfo = {
      ...postInput,
      text: text,
    };
    try {
      const post = await fetch("/api/post", {
        method: "PUT",
        body: JSON.stringify(inputInfo),
      });
      console.log(post);
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
    setisLikeLoading(true);
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
    setTimeout(() => setisLikeLoading(false), 2000);
  }

  async function getLike(postId: String, userId: String) {
    const url = `/api/like/${postId}/${userId}`;

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
    setIsLoading(true);
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
    setTimeout(() => setIsLoading(false), 2000);
  }

  async function getComments(postId: String) {
    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "GET",
      });
      const result = await response.json();
      setCommentList(result);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteComment(commentId: String) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/comment", {
        method: "DELETE",
        body: JSON.stringify(commentId),
      });
      const result = await response.json();
      getPosts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 2000);
  }

  async function updateComment(comment: Comments, text: String) {
    setIsLoading(true);
    const inputInfo = {
      ...comment,
      text: text,
    };
    try {
      const post = await fetch("/api/comment", {
        method: "PUT",
        body: JSON.stringify(inputInfo),
      });
      console.log(post);
      getPosts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <PostsContext.Provider
      value={{
        post,

        createPost,
        updatePost,
        deletePost,
        setallPosts,
        getPosts,
        allPosts,

        createLike,
        deleteLike,
        getLike,

        createComment,
        updateComment,
        getComments,
        deleteComment,
        commentList,

        createBookPost,

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
