const notFound= (req,res,next) =>{
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

const errorHandler = (err,req,res,next)=>{
	let statusCode = res.statusCode===200?500 : res.statusCode
	let message =err.message;
	//Check for Mongoose bad ObjectID 
	if (err.name === 'CastError' && err.king === 'ObjectId'){
		message =  `Resource not found `
		statusCode = 404
	}
	res.status(statusCode).json({message, stack:process.env.NODE_ENV ==='production'?`shit`:err.stack})
}
export {notFound, errorHandler}
