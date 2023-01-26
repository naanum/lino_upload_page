import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./api/fbase";
import UserContextProvider from "./api/userContext";
import Auth from "./auth";
import Upload, { UserObj } from "./upload";

export default function Home() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState<UserObj | null>(null);
  
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserObj({
					uid: user.uid,
				});
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
		<UserContextProvider>
			{userObj ? (<Upload userObj={userObj} />) : (<Auth />)}
		</UserContextProvider>
	) : "Initializing..."}
		</>
	);
}
