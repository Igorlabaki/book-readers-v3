import { useContext } from "react";

import {FollowContext} from '../Context/FollowContext'

const useFollowContext = () => useContext(FollowContext)

export default useFollowContext