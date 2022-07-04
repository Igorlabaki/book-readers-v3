import { useContext } from "react";

import { GoogleBookContext } from '../Context/GoogleBooksContext'

const useGoogleBooksContext = () => useContext(GoogleBookContext)

export default useGoogleBooksContext