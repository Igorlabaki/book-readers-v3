import { useContext } from "react";

import {UserBookContext} from '../Context/UserBooksContext'

const useUserBookContext = () => useContext(UserBookContext)

export default useUserBookContext