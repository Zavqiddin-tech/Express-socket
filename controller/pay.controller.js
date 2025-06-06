const payService = require("../service/pay.service");

class PayController {
  async create(req, res, next) {
    try {
      const newPay = await payService.create(req, res);
      res.status(200).json(newPay);
    } catch (error) {
      next(error);
    }
  }
  // pay controller.js
  async update(req, res, next) {
    try {
      const updatedPay = await payService.update(req, res);
      res.status(200).json(updatedPay);
    } catch (error) {
      next(error);
    }
  }
  async deletePay(req, res, next) {
    try {
      const deletedPay = await payService.deletePay(req, res);
      res.status(200).json(deletedPay);
    } catch (error) {
      next(error);
    }
  }
  async getTodayPay(req, res, next) {
    try {
      const todayPay = await payService.getTodayPay(req, res);
      res.status(200).json(todayPay);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PayController();
