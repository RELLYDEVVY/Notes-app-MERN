/* eslint-disable react/prop-types */
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const logout = () => {
		navigate("/login");
	};
	const name = userInfo && userInfo.fullName;
	const onClearSearch = () => {
		setSearchQuery("");
		handleClearSearch();
	};
	const handleSearch = () => {
		if (searchQuery) {
			onSearchNote(searchQuery);
		}
	};
	return (
		<nav className="bg-white drop-shadow">
			<div className="gap-2 flex items-center px-2 py-2 justify-between container mx-auto">
				<h2 className="text-xl text-black poppins-bold py-2"> Jot </h2>
				<SearchBar
					value={searchQuery}
					onChange={({ target }) => {
						setSearchQuery(target.value);
					}}
					onClearSearch={onClearSearch}
					handleSearch={handleSearch}
				/>
				<ProfileInfo name={name} logout={logout} />
			</div>
		</nav>
	);
};
export default Navbar;
