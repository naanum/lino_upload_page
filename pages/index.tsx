import Home from "../components/home";
import UserContextProvider from "../libs/user/userContext";

export default function Index() {

	return (
				<UserContextProvider>
					<Home/> 
				</UserContextProvider>
	);
}
