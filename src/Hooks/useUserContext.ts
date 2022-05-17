import { useContext } from "react";

import {UserContext} from '../Context/UserContext'

const useUserContext = () => useContext(UserContext)

export default useUserContext