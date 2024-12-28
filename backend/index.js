import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import authenticateToken from "./middleware/utilities.js";
import UserRouter from "./routes/user.js";
import NoteRouter from "./routes/notes.js";

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());

app.use("/", UserRouter);
app.use("/notes", authenticateToken, NoteRouter);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connected");
		app.listen(8000, () => {
			console.log("Server is running on port 8000");
		});
	})
	.catch((err) => console.error("MongoDB connection error:", err));

export default app;
