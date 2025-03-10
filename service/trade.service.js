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
    const { clientId, ...tradeData } = req.body;

    const client = await clientModel.findById(clientId);

    if (!client) {
      throw new Error("Mijoz topilmadi, qayib kiring !");
    }

    const newTrade = await tradeModel.create({
      ...tradeData,
      clientId: clientId,
      userId: req.user.id,
    });

    await clientModel.findByIdAndUpdate(clientId, {
      $inc: { totalDebt: newTrade.price },
    });

    return newTrade;
  }

  async update(req, res) {
    const { text, price } = req.body;

    const trade = await tradeModel.findById(req.params.id);
    if (!trade) {
      throw new Error("Savdo topilmadi, qayta kiring !");
    }

    if (price < trade.paid) {
      throw new Error("Kam pul kiritildi, tekshiring !");
    }

    // Atomik yangilanishlar
    const updatedClient = await clientModel.findByIdAndUpdate(trade.clientId, {
      $inc: { totalDebt: price - trade.price },
    });
    if (!updatedClient) {
      throw new Error("Mijoz, Savdo yangilanishi muvaffaqiyatsiz bo'ldi!");
    }

    const updatedTrade = await tradeModel.findByIdAndUpdate(
      req.params.id,
      { text, price },
      { new: true }
    );

    if (!updatedTrade) {
      throw new Error("Savdo yangilanishi muvaffaqiyatsiz bo'ldi!");
    }

    return updatedTrade;
  }
}

module.exports = new TradeService();
