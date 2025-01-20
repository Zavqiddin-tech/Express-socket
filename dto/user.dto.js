module.exports = class UserDto {
  id;
  firstName;
  lastName;
  companyId;
  phone;
  userName;
  activated;
  role;

  constructor(model) {
    this.id = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.companyId = model.companyId;
    this.phone = model.phone;
    this.userName = model.userName;
    this.activated = model.activated;
    this.role = model.role;
  }
};
