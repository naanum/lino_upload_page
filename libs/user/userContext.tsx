import { EmailAuthCredential } from 'firebase/auth';
import React, { useState } from 'react'


export interface UserContextType{
    uid: string | undefined,
    getUid: () => string|undefined,
    setUid: React.Dispatch<React.SetStateAction<string|undefined>>
}

export const UserContext = React.createContext({} as UserContextType);

const UserContextProvider:React.FC<{
    children:any
}> = ({ children }) => {

    const [uid, setUid] = useState<string|undefined>()
    const getUid = () => uid

    return(
        <UserContext.Provider value={{uid, getUid,setUid}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider