const BaseError = require("../errors/base.error")
const postModel = require("../model/post.model")


module.exports = async function(req, res, next) {
	try {
		const post = await postModel.findById(req.params.id)
		const authorId = req.user.id
		if (post.author !== authorId) {
			return next(BaseError.BadRequest(`Faqat author uchun mumkin`))
		}
		next()
	} catch (error) {
		return next(BaseError.BadRequest(`Faqat author uchun mumkin`))
	}
}