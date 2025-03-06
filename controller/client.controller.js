const clientService = require("../service/client.service");
const {getSocketInstance} = require("../socket")

class ClientController {
	async getAll(req, res, next) {
		try {
			const allCLients = await clientService.getAll(req, res);
			res.status(200).json(allCLients);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newClient = await clientService.create(req, res);
			const io = getSocketInstance()
			io.emit('newClient', newClient);
			res.status(200).json(newClient);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ClientController();