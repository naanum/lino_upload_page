import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import AuthForm from "./authForm";
import { auth } from "../libs/firestore/fbase";
import UserContextProvider from "../libs/user/userContext";

const Auth = () => {

	const onSocialClick = async (event: any) => {
		const {
			target: { name },
		} = event;
		let provider;
		if (name === "google") {
			provider = new GoogleAuthProvider();
		}
		if (provider) {
			await signInWithPopup(auth, provider);
		}
	};

	return (
		<div className="auth">
			<UserContextProvider>
				<AuthForm />
			</UserContextProvider>
			<div>
				<button onClick={onSocialClick} name="google" className="authBtn">
					Continue with Google
				</button>
			</div>
		</div>
	);
};
export default Auth;
