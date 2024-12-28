import Note from "../models/note_model.js";

export const addNote = async (req, res, next) => {
	const { title, content, tags } = req.body;
	const { user } = req.user;
	if (!title) {
		return res.status(400).json({ error: "true", message: "Title is required" });
	}
	if (!content) {
		return res.status(400).json({ error: "true", message: "Content is required" });
	}
	try {
		const note = new Note({
			title,
			content,
			tags: tags || [],
			userId: user._id,
		});
		await note.save();
		return res.json({ error: false, note, message: "Note created successfully" });
	} catch (error) {
		next(error);
	}
};

export const editNote = async (req, res, next) => {
	const { title, content, tags, isPinned } = req.body;
	const { user } = req.user;
	const noteId = req.params.noteId;

	if (!title && !content && !tags) {
		return res.status(400).json({
			error: true,
			message: "No changes provided",
		});
	}
	try {
		const note = await Note.findOne({ _id: noteId, userId: user._id });
		if (!note) {
			return res.status(404).json({ error: true, message: "Note not found" });
		}
		if (title) note.title = title;
		if (content) note.content = content;
		if (tags) note.tags = tags;
		if (isPinned) note.isPinned = isPinned;
		await note.save();
		return res.json({
			error: false,
			note,
			message: "Note updated successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const getNotes = async (req, res, next) => {
	const { user } = req.user;
	try {
		const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
		return res.json({ error: false, notes, message: "All notes received successfully", user });
	} catch (error) {
		next(error);
	}
};

export const deleteNote = async (req, res, next) => {
	const noteId = req.params.noteId;
	const { user } = req.user;
	try {
		const note = await Note.findOne({ _id: noteId, userId: user._id });
		if (!note)
			res.status(400).json({
				error: true,
				message: "Note not found",
			});
		await Note.deleteOne({ _id: noteId, userId: user._id });
		return res.json({ error: false, message: "Note deleted successfully" });
	} catch (error) {
		next(error);
	}
};
export const pinned = async (req, res, next) => {
	const noteId = req.params.noteId;
	const { user } = req.user;
	const { isPinned } = req.body;
	try {
		const note = await Note.findOne({ _id: noteId, userId: user._id });
		if (!note)
			res.status(400).json({
				error: true,
				message: "Note not found",
			});
		note.isPinned = isPinned;
		await note.save();
		return res.json({ error: false, note, message: "Note updated successfully" });
	} catch (error) {
		next(error);
	}
};

export const queryNote = async (req, res, next) => {
	const { user } = req.user;
	const { query } = req.query;
	if (!query) {
		res.status(400).json({
			error: true,
			message: "Search Query is required",
		});
	}
	try {
		const matchedNotes = await Note.find({
			userId: user._id,
			$or: [{ title: { $regex: new RegExp(query, "i") } }, { content: { $regex: new RegExp(query, "i") } }, { tags: { $regex: new RegExp(query, "i") } }],
		});
		return res.json({
			error: false,
			notes: matchedNotes,
			message: "Notes matching the search query retrieved successfully",
		});
	} catch (error) {
		next(error);
	}
};
