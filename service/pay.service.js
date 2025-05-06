const userModel = require("../model/user.model");
const payModel = require("../model/pay.model");
const tradeModel = require("../model/trade.model");
const clientModel = require("../model/client.model");

class PayService {
  async create(req, res) {
    const { tradeId, clientId, amount, ...payData } = req.body;
    if (!(amount > 0)) {
      throw new Error("0 dan katta son kiriting, tekshiring !");
    }

    const trade = await tradeModel.findById(tradeId);
    const client = await clientModel.findById(clientId);

    if (!client || !trade) {
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

    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { debts: -amount, totalPay: amount },
    });
    if (!updatedUser) {
      throw new Error("Foydalanuvchi yangilanishida nosozlik bor");
    }

    const updatedClient = await clientModel.findByIdAndUpdate(
      clientId,
      {
        $inc: { totalPurchase: amount },
      },
      { new: true }
    );
    if (!updatedClient) {
      throw new Error("Foydalanuvchi yangilanishida nosozlik bor");
    }

    const updatedTrade = await tradeModel.findByIdAndUpdate(
      tradeId,
      {
        $push: { payHistory: { $each: [newPay._id], $position: 0 } },
        $inc: { paid: amount },
      },
      { new: true }
    );
    if (!updatedTrade) {
      throw new Error("Savdo yangilanishida nosozlik bor");
    }

    return { newPay, updatedClient };
  }

  async update(req, res) {
    const { amount, detail } = req.body;
    const payId = req.params.id;

    if (!(amount > 0)) {
      throw new Error("0 dan katta son kiriting, tekshiring !");
    }

    const pay = await payModel.findById(payId);
    if (!pay) {
      throw new Error("To'lov topilmadi, tekshiring !");
    }

    const trade = await tradeModel.findById(pay.tradeId);

    const sum = trade.paid - pay.amount + amount;

    if (trade.price < sum) {
      throw new Error("Katta pul kiritildi, tekshiring !");
    }

    // Atomik yangilanishlar
    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { debts: pay.amount - amount, totalPay: amount - pay.amount },
    });
    if (!updatedUser) {
      throw new Error("Foydalanuvchi yangilanishida nosozlik bor");
    }
    const updatedClient = await clientModel.findByIdAndUpdate(pay.clientId, {
      $inc: { totalPurchase: amount - pay.amount },
    });
    if (!updatedClient) {
      throw new Error("Mijoz yangilanishida nosozlik bor");
    }
    const updatedTrade = await tradeModel.findByIdAndUpdate(pay.tradeId, {
      $inc: { paid: amount - pay.amount },
    });
    if (!updatedTrade) {
      throw new Error("Savdo yangilanishida nosozlik bor");
    }

    const updateFields = { amount: amount };
    if (detail) {
      updateFields.detail = detail;
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

    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { debts: pay.amount, totalPay: -pay.amount },
    });
    if (!updatedUser) {
      throw new Error("Foydalanuvchi yangilanishida xatolik bor");
    }

    const updatedTrade = await tradeModel.findByIdAndUpdate(pay.tradeId, {
      $inc: { paid: -pay.amount },
      $pull: { payHistory: payId },
    });
    if (!updatedTrade) {
      throw new Error("Savdo yangilanishida xatolik bor");
    }

    const updatedClient = await clientModel.findByIdAndUpdate(pay.clientId, {
      $inc: { totalPurchase: -pay.amount },
    });

    if (!updatedClient) {
      throw new Error("Mijoz yangilanishida xatolik bor");
    }

    const deletedPay = await payModel.findByIdAndDelete(payId);

    return deletedPay;
  }
}

module.exports = new PayService();
