import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const Toast = ({ isShown, message, type, onClose }) => {
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [onClose]);

	return (
		<div className={`fixed top-10 right-6 transition-all duration-200 ${isShown ? "opacity-100" : "opacity-0"}`}>
			<div
				className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full after:absolute after:top-0 after:left-0 after:rounded-l-lg ${
					type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
				}`}
			>
				<div className="flex items-center gap-3 py-2 px-4">
					<div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-[20000s] ${type === "delete" ? "bg-red-100" : "bg-green-100"}`}>
						{type === "delete" ? <MdDeleteOutline className="text-xl text-red-500 " /> : <LuCheck className="text-xl text-green-500" />}
					</div>
					<p className="text-sm text-slate-800">{message} </p>
				</div>
			</div>
		</div>
	);
};
export default Toast;
