import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from "../libs/firestore/fbase";
import router from "next/router";
import UserContextProvider, { UserContext } from "../libs/user/userContext";
import Upload from "./upload";
import Auth from "./auth";
import MyLock from "./lock";

export default function Home() {
    const [init, setinit] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);

    const {
        uid, getUid, setUid
    } = useContext(UserContext);
  
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			} else {
				setUid(undefined);
                setIsUser(false);
			}
		});
        setinit(true);
	}, []);

    useEffect(()=>{
        setIsUser(true);
    }, [uid])

	return (
		<>
        {
            init ? (
                isUser && uid ? <Upload currentUser = {uid} /> : <Auth/> 
            ) : "initializing"
        }
        </>
	);
}
