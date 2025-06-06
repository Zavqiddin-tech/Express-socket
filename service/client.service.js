const userModel = require("../model/user.model");
const clientModel = require("../model/client.model");

class ClientService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allClients = await clientModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allClients;
  }

  async getOne(req, res) {
    const client = await clientModel.findById(req.params.id);

    return client;
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

  async search(req, res) {
    const limit = req.query.limit
    const name = req.query.name;
    const clients = await clientModel.find({
      userId: req.user.id,
      $or: [
        { fName: { $regex: name, $options: "i" } },
        { lName: { $regex: name, $options: "i" } },
      ],
    }).limit(limit);
    return clients;
  }
}

module.exports = new ClientService();
