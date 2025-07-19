// Error Handler
module.exports.errorHandler = (err, req, res, next) => {
	console.log(err);

	const statusCode = err.status || 500;

	const errorMessage = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details
		}
	});
};
