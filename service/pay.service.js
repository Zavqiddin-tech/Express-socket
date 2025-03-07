const mongoose = require("mongoose");
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

  async update(req, res) {
    let sum = 0;
    const newAmount = req.body.amount;
    const pay = await payModel.findById(req.params.id);
    if (!pay) {
      throw new Error("To'lov topilmadi, tekshiring !");
    }

    const trade = await tradeModel.findById(pay.tradeId);
    const client = await clientModel.findById(pay.clientId);


    sum = trade.paid - pay.amount;
    sum += newAmount;
    if (!(trade.price >= sum)) {
      throw new Error("Katta pul kiritildi, tekshiring !");
    }

    trade.paid -= pay.amount;
    trade.paid += newAmount;
    client.totalPurchase -= pay.amount;
    client.totalPurchase += newAmount;
    pay.amount = newAmount;

    await trade.save();
    await client.save();
    await pay.save();

    return pay;
  }
}

module.exports = new PayService();
