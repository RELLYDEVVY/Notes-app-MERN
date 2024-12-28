import express from "express";
import * as Controller from "../controllers/notes.js";

const router = express.Router();

router.post("/", Controller.addNote);
router.post("/pinned/:noteId", Controller.pinned);
router.put("/:noteId", Controller.editNote);
router.get("/", Controller.getNotes);
router.get("/search-notes/", Controller.queryNote);
router.delete("/:noteId", Controller.deleteNote);
export default router;
