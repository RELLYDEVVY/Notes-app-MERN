import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNote from "./AddEditNote";
import { useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";
import NotePic from "/note.jpg";

// Set the app element for accessibility
Modal.setAppElement("#root");
const Home = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState(null);
	const [allNote, setAllNote] = useState(null);
	const [isSearch, setIsSearch] = useState(false);
	const [showToastMsg, setShowToastMsg] = useState({
		isShown: false,
		message: "",
		type: "add",
	});
	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShown: false,
		type: "add",
		data: null,
	});
	const [view, setView] = useState(true);
	const handleEdit = (note) => {
		setOpenAddEditModal({ isShown: true, type: "edit", data: note });
	};
	const getNotes = async () => {
		try {
			const response = await axiosInstance.get("/notes");
			if (response.data && response.data.notes) {
				setAllNote(response.data.notes);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const deleteNote = async (data) => {
		try {
			const response = await axiosInstance.delete("/notes/" + data._id);
			if (response.data && !response.data.error) {
				getNotes();
				showToastMessage("Note deleted successfully", "delete");
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				console.log(error);
			}
		}
	};
	const pinNote = async (data) => {
		try {
			const response = await axiosInstance.post("/notes/pinned/" + data._id, { isPinned: !data.isPinned });
			if (response.data && !response.data.error) {
				showToastMessage("Toast updated successfully");
				getNotes();
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axiosInstance.get("/get-user");
				if (response.data && response.data.user) {
					setUserInfo(response.data.user);
					navigate("/");
				}
			} catch (error) {
				if (error.response?.status == 401) {
					localStorage.clear();
					navigate("/login");
				}
			}
		};
		getNotes();
		getUsers();
	}, [navigate]);
	const handleCloseToast = () => {
		setShowToastMsg({ isShown: false, message: "" });
	};
	const showToastMessage = (message, type) => {
		setShowToastMsg({
			isShown: true,
			message,
			type,
		});
	};
	const onSearchNote = async (query) => {
		try {
			const response = await axiosInstance.get("/notes/search-notes", { params: { query } });
			if (response.data && response.data.notes) {
				setIsSearch(true);
				setAllNote(response.data.notes);
			}
		} catch (error) {
			console.log(error);
		}
		return;
	};
	const handleClearSearch = () => {
		setIsSearch(false);
		getNotes();
	};
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setView(false);
		}, 20000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [view]);
	return (
		<>
			<Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
			<div className="container mx-auto px-2 pb-10">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
					{allNote?.length < 1 ? (
						<EmptyCard
							imgSrc={NotePic}
							message={isSearch ? "Oops no notes were found" : "Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders, let's get started"}
						/>
					) : (
						allNote?.map((note) => (
							<NoteCard
								key={note._id}
								title={note.title}
								date={note.createdOn}
								content={note.content}
								tags={note.tags}
								isPinned={note.isPinned}
								onDelete={() => deleteNote(note)}
								onEdit={() => handleEdit(note)}
								onPinNote={() => {
									pinNote(note);
								}}
							/>
						))
					)}
				</div>
			</div>
			<button
				onClick={() => {
					setView(true);
					setOpenAddEditModal({
						isShown: true,
						type: "add",
						data: null,
					});
				}}
				className={` hover:bg-blue-600 w-12 h-12 flex items-center justify-center bg-primary rounded-2xl bottom-20 fixed transition-all duration-300 ease-in-out ${
					view ? "right-6" : "-right-4"
				}`}
			>
				<MdAdd className="text-[32px] text-white" />
			</button>
			<Modal
				isOpen={openAddEditModal.isShown}
				onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
				style={{
					overlay: {
						backgroundColor: "rgba(0,0,0,0.2",
					},
				}}
				contentlabel=""
				className=" w-[90%] max-h-3/4 bg-white rounded-md mx-auto mt-[15vh] p-5 overflow-x-clip"
			>
				<AddEditNote
					getNotes={getNotes}
					type={openAddEditModal.type}
					noteData={openAddEditModal.data}
					onClose={() =>
						setOpenAddEditModal({
							isShown: false,
							type: "add",
							data: null,
						})
					}
					showToastMessage={showToastMessage}
				/>
			</Modal>
			<Toast isShown={showToastMsg.isShown} type={showToastMsg.type} message={showToastMsg.message} onClose={handleCloseToast} />
		</>
	);
};
export default Home;
