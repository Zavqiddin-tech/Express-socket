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
}

module.exports = new PayController();
