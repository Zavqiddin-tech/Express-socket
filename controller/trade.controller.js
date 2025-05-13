const tradeService = require("../service/trade.service");

class TradeController {
	async getAll(req, res, next) {
		try {
			const allTrades = await tradeService.getAll(req, res);
			res.status(200).json(allTrades);
		} catch (error) {
			next(error);
		}
	}
	async getAllByClient(req, res, next) {
		try {
			const allByClient = await tradeService.getAllByClient(req, res);
			res.status(200).json(allByClient);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newTrade = await tradeService.create(req, res);
			res.status(200).json(newTrade);
		} catch (error) {
			next(error);
		}
	}
	
	async update(req, res, next) {
		try {
			const updatedTrade = await tradeService.update(req, res);
			res.status(200).json(updatedTrade);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TradeController();