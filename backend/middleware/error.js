export const notFoundHandler = (req, res, next) => {
	const error = new Error("Route not Found");
	error.status = 404;
	next(error);
};

export const errorHandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		error: true,
		message: err.message || "Something went wrong",
	});
};
