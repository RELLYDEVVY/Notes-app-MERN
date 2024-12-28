import { getInitials } from "../utils/helper";

// eslint-disable-next-line react/prop-types
const ProfileInfo = ({ name, logout }) => {
	return (
		name && (
			<div className="flex items-center gap-3 overflow-hidden">
				<div className=" md:text-sm poppins-bold flex items-center justify-center md:w-12 md:h-12 rounded-full text-slate-950 bg-slate-100 w-8 h-8 text-[11px] px-4">{getInitials(name)}</div>
				<div>
					<p className="md:text-sm text-[11px] poppins-bold w-20 -mb-2">{name}</p>
					<button className="md:text-sm text-[11px] underline text-slate-700" onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		)
	);
};
export default ProfileInfo;
