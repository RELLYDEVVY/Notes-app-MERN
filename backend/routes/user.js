import express from "express";
import * as Controller from "../controllers/user.js";
import authenticateToken from "../middleware/utilities.js";

const router = express.Router();

router.post("/login", Controller.login);
router.post("/signup", Controller.signup);
router.get("/get-user", authenticateToken, Controller.getUser);

export default router;
