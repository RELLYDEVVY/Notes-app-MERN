import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
	const routes = (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/signup" exact element={<SignUp />} />
			</Routes>
		</Router>
	);
	return <>{routes}</>;
}

export default App;
