const tradeModel = require("../model/trade.model");
const clientModel = require("../model/client.model");

class TradeService {
  async getAll(req, res) {
    console.log("test");
    const limit = parseInt(req.query.limit);
    console.log(limit);

    const allTrades = await tradeModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit);
    return allTrades;
  }

  async create(req, res) {
    const client = await clientModel.findById(req.body.clientId);

    if (!client) {
      throw new Error("Mijoz topilmadi, qayib kiring !");
    }

    const newTrade = await tradeModel.create({
      ...req.body,
      userId: req.user.id,
    });

    client.totalDebt += newTrade.price;
    await client.save();

    return newTrade;
  }
}

module.exports = new TradeService();
