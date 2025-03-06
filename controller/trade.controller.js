const tradeService = require("../service/trade.service");
const {getSocketInstance} = require("../socket")

class TradeController {
	async getAll(req, res, next) {
		try {
			const allCLients = await tradeService.getAll(req, res);
			res.status(200).json(allCLients);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newTrade = await tradeService.create(req, res);
			const io = getSocketInstance()
			io.emit('newTrade', newTrade);
			res.status(200).json(newTrade);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TradeController();