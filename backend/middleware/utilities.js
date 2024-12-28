import pkg from "jsonwebtoken";
const { verify } = pkg;
const authenticateToken = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: true, message: "Token is missing" });
	}
	try {
		const user = await new Promise((resolve, reject) => {
			verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
				if (err) reject("Invalid or expired token");
				resolve(decoded);
			});
		});

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ error: true, message: error || "Authentication error" });
	}
};

export default authenticateToken;
