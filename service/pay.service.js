const payModel = require("../model/pay.model");
const tradeModel = require("../model/trade.model");
const clientModel = require("../model/client.model");

class PayService {
  async create(req, res) {
    const trade = await tradeModel.findById(req.body.tradeId);
    const client = await clientModel.findById(req.body.clientId);

    if (!client) {
      throw new Error("Mijoz topilmadi, qayib kiring !");
    }
    if (!(trade.price >= trade.paid + req.body.amount)) {
      throw new Error("Katta pul kiritildi, tekshiring !");
    }

    const newPay = await payModel.create({
      ...req.body,
      userId: req.user.id,
    });

    trade.payHistory.unshift(newPay._id);
    trade.paid += newPay.amount;
    client.totalPurchase += newPay.amount;

    await trade.save();
    await client.save();

    return newPay;
  }
}

module.exports = new PayService();
