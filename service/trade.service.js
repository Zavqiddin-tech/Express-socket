const userModel = require("../model/user.model");
const tradeModel = require("../model/trade.model");
const clientModel = require("../model/client.model");

class TradeService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allTrades = await tradeModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allTrades;
  }

  async getAllByClient(req, res) {
    const limit = parseInt(req.query.limit);
    const allTrades = await tradeModel
      .find({ clientId: req.params.id })
      .populate("payHistory")
      .sort({ createdAt: -1 })
      .limit(limit);
    return allTrades;
  }

  async create(req, res) {
    const { clientId, ...tradeData } = req.body;

    if (!(tradeData.price > 0)) {
      throw new Error("0 dan katta son kiriting, tekshiring !");
    }

    const client = await clientModel.findById(clientId);
    if (!client) {
      throw new Error("Mijoz topilmadi, qayib kiring !");
    }

    const newTrade = await tradeModel.create({
      ...tradeData,
      clientId: clientId,
      userId: req.user.id,
    });

    const newClient = await clientModel.findByIdAndUpdate(
      clientId,
      {
        $inc: { totalDebt: newTrade.price },
      },
      { new: true }
    );
    await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { debts: newTrade.price },
    });

    return { newTrade, newClient };
  }

  async update(req, res) {
    const { text, price } = req.body;

    if (!(price > 0)) {
      throw new Error("0 dan katta son kiriting, tekshiring !");
    }

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
      throw new Error("Mijoz yangilanishida xatolik bor !");
    }

    await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { debts: price - trade.price },
    });
    if (!updatedUser) {
      throw new Error("Foydalanuvchi yangilanishida xatolik bor");
    }

    const updatedTrade = await tradeModel.findByIdAndUpdate(
      req.params.id,
      { text, price },
      { new: true }
    );

    return updatedTrade;
  }
}

module.exports = new TradeService();
