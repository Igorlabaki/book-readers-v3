import { Comments, Posts } from "@prisma/client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import useUserContext from "../Hooks/useUserContext";
import getUser from "../pages/api/user/[id]";

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
  updateComment?: (comment, text: String, user_id: String) => void;
  commentList?: Comments[];

  post?: any;
  getPost?: (postId: String) => void;
  createPost?: (post: object) => void;
  getPosts?: (userId: String) => Promise<any>;
  updatePost?: (post: Posts, text: String) => void;
  deletePost?: (postId: String) => void;
  setallPosts?: Dispatch<SetStateAction<Posts[]>>;
  allPosts?: Posts[];

  createBookPost?: (
    bookInputId: String,
    userInputId: String,
    listType: string,
    postText?: string
  ) => void;

  currentPostPage?: number;
  postsPerPage?: number;
  setCurrentPostPage?: Dispatch<SetStateAction<number>>;
}

export const PostsContext = createContext<PostsContext>({
  isLoading: null,
});

export function PostsContextProvider({ children }: ContextProvider) {
  const { getUser, user } = useUserContext();

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
      const result = await post.json();
      setPost(() => result);
      console.log(result);
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function deletePost(postId: String) {
    setIsLoading(true);
    try {
      const post = await fetch("/api/post", {
        method: "DELETE",
        body: JSON.stringify(postId),
      });
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getPost(postId: String) {
    setIsLoading(true);
    const url = `/api/post/${"user"}/${postId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const result = await response.json();
      setPost(result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getPosts(userId: String) {
    try {
      const response = await fetch(`/api/post/${user.id}`);
      const result = await response.json();
      setallPosts(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createBookPost(
    bookInputId: String,
    userInputId: String,
    listType: string,
    postText?: string
  ) {
    setIsLoading(true);
    const postBookInput = {
      bookId: bookInputId,
      userId: userInputId,
      listType: listType,
      postText: postText,
    };
    try {
      if (bookInputId) {
        const response = await fetch("/api/userBook", {
          method: "POST",
          body: JSON.stringify(postBookInput),
        });
        const result = await response.json();
        getUser(result.fk_id_user);
      }
      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(postBookInput),
      });
    } catch (error) {
      console.log(error);
    }
    getPosts(user?.id);
    setIsLoading(false);
  }

  async function createLike(post: Posts, userId: String) {
    const inputLike = {
      id: post.id,
      user_id: userId,
    };

    const infoNotification = {
      id: post.id,
      user_action: userId,
      user_id: post.user_id,
      text: "liked your post",
    };

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify(inputLike),
      });
      const responseNotification = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(infoNotification),
      });
      const result = await responseNotification.json();
      console.log(result);
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
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
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function createComment(
    postInput: Posts,
    comment: String,
    user_id: String
  ) {
    const infoComment = {
      ...postInput,
      comment: comment,
      user_id: user_id,
    };
    const infoNotification = {
      user_action: user_id,
      user_id: postInput.user_id,
      text: "comment your post",
    };
    setIsLoading(true);
    if (postInput.text != "") {
      try {
        const responseComment = await fetch("/api/comment", {
          method: "POST",
          body: JSON.stringify(infoComment),
        });
        const responseNotification = await fetch("/api/notifications", {
          method: "POST",
          body: JSON.stringify(infoNotification),
        });
        const result = await responseNotification.json();
        getPosts(user.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      showError("", 3000);
    }
    setIsLoading(false);
  }

  async function getComments(postId: String) {
    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "GET",
      });
      const result = await response.json();
      setCommentList(result);
      getPosts(user.id);
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
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function updateComment(comment, text: String, user_id: String) {
    setIsLoading(true);
    const inputInfo = {
      ...comment,
      text: text,
    };
    const infoNotification = {
      id: comment.post_id,
      user_id: comment.post.user_id,
      user_action: user_id,
      text: "update his comment on your post",
    };
    try {
      const post = await fetch("/api/comment", {
        method: "PUT",
        body: JSON.stringify(inputInfo),
      });
      const responseNotification = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(infoNotification),
      });
      getPosts(user.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
        getPost,
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
