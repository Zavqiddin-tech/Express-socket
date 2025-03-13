const userModel = require("../model/user.model");
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

    await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { clientCount: 1 },
    });

    return newClient;
  }
}

module.exports = new ClientService();
