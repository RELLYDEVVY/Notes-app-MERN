/* eslint-disable react/prop-types */
import { useState } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const AddEditNote = ({ noteData, type, onClose, getNotes, showToastMessage }) => {
	const [title, setTitle] = useState(noteData?.title || "");
	const [content, setContent] = useState(noteData?.content || "");
	const [tags, setTags] = useState(noteData?.tags || []);
	const [errors, setError] = useState(null);
	const addNote = async () => {
		try {
			const response = await axiosInstance.post("/notes", { title, content, tags });
			if (response.data && response.data.note) {
				getNotes();
				onClose();
				showToastMessage("Note Added successfully")
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				setError(error.response.data.message);
			}
		}
	};
	const editNote = async () => {
		try {
			const response = await axiosInstance.put("/notes/" + noteData._id, { title, content, tags });
			if (response.data && response.data.note) {
				getNotes();
				onClose();
				showToastMessage("Note updated successfully");

			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				setError(error.response.data.message);
			}
		}
	};
	const handleAddNote = () => {
		if (!title) {
			setError("Please enter the title");
			return;
		}
		if (!content) {
			setError("Please enter the content");
			return;
		}
		setError("");
		if (type === "edit") {
			editNote();
		} else {
			addNote();
		}
	};
	return (
		<div className="relative">
			<button className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 -right-3 hover:bg-slate-500" onClick={onClose}>
				<MdClose className="text-xl text-slate-400" />
			</button>
			<div className="flex flex-col gap-2">
				<label htmlFor="" className="input-label">
					Title
				</label>
				<input value={title} onChange={({ target }) => setTitle(target.value)} type="text" className="text-2xl text-slate-950 outline-none" placeholder="Go to the Gym At 5" />
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<label htmlFor="" className="input-label">
					CONTENT
				</label>
				<textarea
					value={content}
					onChange={({ target }) => setContent(target.value)}
					rows={10}
					type="text"
					className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
					placeholder="Content"
				></textarea>
			</div>
			<div className="mt-3">
				<label htmlFor="" className="input-label">
					TAGS
				</label>
				<TagInput tags={tags} setTags={setTags} />
			</div>
			{errors && <p className="text-red-500 text-sm pt-4">{errors}</p>}
			<button className="btn-primary poppins-bold mt-5 p-3" onClick={() => handleAddNote()}>
				{type === "edit" ? "Edit Note" : "Add Note"}
			</button>
		</div>
	);
};
export default AddEditNote;
