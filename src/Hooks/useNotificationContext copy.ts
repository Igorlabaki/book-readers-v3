import { useContext } from "react";

import {NotificationContext} from '../Context/NotificationContext'

const useNotificationContext = () => useContext(NotificationContext)

export default useNotificationContext