import { useContext } from "react";

import {BookContext} from '../Context/BooksContext'

const useBookContext = () => useContext(BookContext)

export default useBookContext