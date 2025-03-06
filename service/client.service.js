const clientModel = require("../model/client.model");

class ClientService {
  async getAll(req, res) {
    console.log("test");
    const limit = parseInt(req.query.limit);
    console.log(limit);

    const allClients = await clientModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit);
    return allClients;
  }

  async create(req, res) {
    const newClient = await clientModel.create({
      ...req.body,
      userId: req.user.id,
    });
    return newClient;
  }
}

module.exports = new ClientService();
