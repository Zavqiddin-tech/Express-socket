const clientService = require("../service/client.service");

class ClientController {
	async getAll(req, res, next) {
		try {
			const allClients = await clientService.getAll(req, res);
			res.status(200).json(allClients);
		} catch (error) {
			next(error);
		}
	}
	async getOne(req, res, next) {
		try {
			const client = await clientService.getOne(req, res);
			res.status(200).json(client);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newClient = await clientService.create(req, res);
			res.status(200).json(newClient);
		} catch (error) {
			next(error);
		}
	}

	async search(req, res, next) {
		try {
			const clients = await clientService.search(req, res);
			res.status(200).json(clients);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ClientController();