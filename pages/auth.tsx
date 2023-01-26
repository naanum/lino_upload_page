import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import AuthForm from "./api/authForm";
import { auth } from "./api/fbase";

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
		<div>
			<AuthForm />
			<div>
				<button onClick={onSocialClick} name="google" className="authBtn">
					Continue with Google
				</button>
			</div>
		</div>
	);
};
export default Auth;
