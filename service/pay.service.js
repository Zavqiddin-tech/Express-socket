const payModel = require("../model/pay.model");
const tradeModel = require("../model/trade.model");
const clientModel = require("../model/client.model");

class PayService {
  async create(req, res) {
    const { tradeId, clientId, amount, ...payData } = req.body;

    const trade = await tradeModel.findById(tradeId);
    const client = await clientModel.findById(clientId);

    if (!client) {
      throw new Error("Mijoz topilmadi, qayib kiring !");
    }
    if (trade.price < trade.paid + amount) {
      throw new Error("Katta pul kiritildi, tekshiring !");
    }

    const newPay = await payModel.create({
      ...payData,
      tradeId,
      clientId,
      amount,
      userId: req.user.id,
    });

    await tradeModel.findByIdAndUpdate(tradeId, {
      $push: { payHistory: { $each: [newPay._id], position: 0 } },
      $inc: { paid: amount },
    });

    await clientModel.findByIdAndUpdate(clientId, {
      $inc: { totalPurchase: amount },
    });

    return newPay;
  }

  async update(req, res) {
    const { newAmount, newDetail } = req.body;
    const payId = req.params.id;

    const pay = await payModel.findById(payId);

    if (!pay) {
      throw new Error("To'lov topilmadi, tekshiring !");
    }

    const trade = await tradeModel.findById(pay.tradeId);

    const sum = trade.paid - pay.amount + newAmount;

    if (trade.price < sum) {
      throw new Error("Katta pul kiritildi, tekshiring !");
    }

    // Atomik yangilanishlar
    await tradeModel.findByIdAndUpdate(pay.tradeId, {
      $inc: { paid: newAmount - pay.amount },
    });
    await clientModel.findByIdAndUpdate(pay.clientId, {
      $inc: { totalPurchase: newAmount - pay.amount },
    });

    const updateFields = { amount: newAmount };
    if (newDetail) {
      updateFields.detail = newDetail;
    }

    const updatedPay = await payModel.findByIdAndUpdate(payId, updateFields, {
      new: true,
    });

    return updatedPay;
  }

  async deletePay(req, res) {
    const payId = req.params.id;
    const pay = await payModel.findById(payId);

    if (!pay) {
      throw new Error("To'lov topilmadi, tekshiring !");
    }

    await tradeModel.findByIdAndUpdate(pay.tradeId, {
      $inc: { paid: -pay.amount },
      $pull: { payHistory: payId },
    });

    await clientModel.findByIdAndUpdate(pay.clientId, {
      $inc: { totalPurchase: -pay.amount },
    });

    const deletedPay = await payModel.findByIdAndDelete(payId);

    return deletedPay;
  }
}

module.exports = new PayService();
