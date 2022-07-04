import { useContext } from "react";

import {PostsContext} from '../Context/PostsContext'

const usePostsContext = () => useContext(PostsContext)

export default usePostsContext