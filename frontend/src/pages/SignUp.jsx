import { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const handleSignup = async (e) => {
		e.preventDefault();
		if (!name) {
			setError("Please enter a your name");
			return;
		}
		if (!validateEmail(email)) {
			setError("Please enter a valid email address. ");
			return;
		}
		if (!password) {
			setError("Please enter a password");
			return;
		}
		setError(" ");
		try {
			const response = await axiosInstance.post("/signup", { email: email, password: password, fullName: name });
			if (response.data && response.data.accessToken) {
				localStorage.setItem("token", response.data.accessToken);
				navigate("/dashboard");
				console.log(response.data)
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				setError(error.response.data.message);
			} else {
				setError("Unexpected error occured, pleae try-again");
			}
		}
	};
	return (
		<>
			<Navbar />
			<div className="flex items-center justify-center mt-28">
				<div className="py-10 bg-white border rounded w-96 px-7">
					<form onSubmit={handleSignup} className="bg-transparent">
						<h4 className="text-2xl mb-7">SignUp</h4>
						<input type="text" placeholder="Name" className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
						<input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
						<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
						{error && <p className="text-red-500 text-xs pb-1">{error}</p>}
						<button type="submit" className="btn-primary">
							Create Account
						</button>
						<p className="text-sm text-center mt-4">
							Already have an account{"  "}
							<Link to="/" className="font-medium text-primary underline">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};
export default SignUp;
