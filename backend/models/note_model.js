import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	tags: { type: [String], default: [] },
	isPinned: { type: Boolean, default: false },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	createdOn: { type: Date, default: new Date().getTime() },
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
