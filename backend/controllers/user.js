import User from "../models/user_model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email) return res.status(400).json({ error: true, message: "Email is required" });
		if (!password) return res.status(400).json({ error: true, message: "Password is required" });
		const userInfo = await User.findOne({ email: email });
		if (!userInfo) return res.status(401).json({ message: "Invalid Credentials" });
		if (userInfo.password == password) {
			const user = { user: userInfo };
			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "300m" });
			return res.status(200).json({ error: false, message: "Login successful", email, accessToken });
		}
		return res.status(401).json({ error: true, message: "Invalid Credentials" });
	} catch (error) {
		next(error);
	}
};

export const signup = async (req, res, next) => {
	try {
		const { fullName, email, password } = req.body;
		if (!fullName) return res.status(400).json({ error: true, message: "Full Name is Required" });
		if (!email) return res.status(400).json({ error: true, message: "Email is Required" });
		if (!password) return res.status(400).json({ error: true, message: "Password is Required" });
		const isUser = await User.findOne({ email: email });
		if (isUser) return res.status(409).json({ error: true, message: "User already exists" });
		const user = new User({ fullName, email, password });
		await user.save();
		const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3000m" });
		return res.json({ error: false, user, accessToken, message: "Registration successful" });
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const { user } = req.user;
		const isUser = await User.findOne({ _id: user._id });
		if (!isUser) return res.status(401).json({ error: true, message: "User not found" });
		return res.json({
			user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn },
			message: "",
		});
	} catch (error) {
		next(error);
	}
};
