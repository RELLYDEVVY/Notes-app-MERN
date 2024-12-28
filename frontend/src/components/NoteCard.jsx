/* eslint-disable react/prop-types */
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
	return (
		<div className="rounded border p-4 bg-white hover:shadow-xl transition-all ease-in-out w-full">
			<div className=" flex items-center justify-between">
				<div>
					<h4 className="text-lg poppins-bold mb-2">{title}</h4>
					<span className="text-sm text-slate-500">{moment(date).format("Do MMM YYYY, h:mm a")}</span>
				</div>
				<MdOutlinePushPin className={`icon-btn active:text-primary cursor-pointer ${isPinned ? "text-primary" : "text-slate-300"}`} onClick={onPinNote} />
			</div>
			<p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
			<div className="flex items-center justify-between mt-2">
				<div className="flex gap-2 text-slate-300">
					{tags.map((tag, index) => (
						<div key={index} className="text-sm">
							#{tag}
						</div>
					))}
				</div>
				<div className="flex items-center gap-2">
					<MdCreate className="icon-btn hover:text-green-600 cursor-pointer" onClick={onEdit} />
					<MdDelete className="icon-btn hover:text-red-500 cursor-pointer" onClick={onDelete} />
				</div>
			</div>
		</div>
	);
};
export default NoteCard;
