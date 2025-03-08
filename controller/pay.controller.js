const payService = require("../service/pay.service");
const { getSocketInstance } = require("../socket");

class PayController {
  async create(req, res, next) {
    try {
      const newPay = await payService.create(req, res);
      const io = getSocketInstance();
      io.emit("newPay", newPay);
      res.status(200).json(newPay);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const updatePay = await payService.update(req, res);
      const io = getSocketInstance();
      io.emit("updatePay", updatePay);
      res.status(200).json(updatePay);
    } catch (error) {
      next(error);
    }
  }
  async deletePay(req, res, next) {
    try {
      const deletedPay = await payService.deletePay(req, res);
      const io = getSocketInstance();
      io.emit("deletePay", deletedPay);
      res.status(200).json(deletedPay);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PayController();
