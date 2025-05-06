module.exports = class UserDto {
  id;
  fName;
  lName;
  companyName;
  userName;
  activated;
  phone;
  role;
  clientCount;
  totalPay;
  debts;
  detail;

  constructor(model) {
    this.id = model._id;
    this.fName = model.fName;
    this.lName = model.lName;
    this.companyName = model.companyName;
    this.userName = model.userName;
    this.activated = model.activated;
    this.phone = model.phone;
    this.role = model.role;
    this.clientCount = model.clientCount;
    this.totalPay = model.totalPay;
    this.debts = model.debts;
    this.detail = model.detail;
  }
};
