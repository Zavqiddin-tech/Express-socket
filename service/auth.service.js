const argon2 = require("argon2");
const tokenService = require("./token.service");
const companyModel = require("../model/auth/company.model");
const userModel = require("../model/auth/user.model");
const UserDto = require("../dto/user.dto");

class AuthService {
  async register(
    userName,
    password,
    activated,
    firstName,
    lastName,
    companyId,
    phone,
    role
  ) {
    if (role === "admin") {
      throw new Error("admin mavjud");
    }
    // search company
    const company = await companyModel.findById(companyId);
    const existUser = await userModel.findOne({ userName });
    if (!company) {
      throw new Error(`Companiya mavjud emas`);
    }
    if (existUser) {
      throw new Error(`User ${existUser.userName} oldin ro'yxatdan o'tgan`);
    }

    if (!password) {
      throw new Error(`parol ni ham kiriting`);
    }
    const hashPassword = await argon2.hash(password);
    const user = await userModel.create({
      userName,
      password: hashPassword,
      activated,
      firstName,
      lastName,
      companyId,
      phone,
      role,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    

    company.users.push(userDto.id);
    await company.save();
    return { user: userDto, ...tokens };
  }

  async companyRegister(data) {
    const exitCompany = await companyModel.findOne({
      companyName: data.companyName,
    });

    if (exitCompany) {
      throw new Error(`Bu ${data.companyName} oldin ro'yxatdan o'tgan`);
    }

    const company = await companyModel.create({ ...data });
    return company;
  }

  async login(userName, password) {
    const user = await userModel.findOne({ userName });

    if (!user) {
      throw new Error("User mavjud emas");
    }

    const isPassword = await argon2.verify(user.password, password);
    if (!isPassword) {
      throw new Error("Parol xato");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }



  
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Bad authorization");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDB) {
      throw new Error("Bad authorization");
    }

    const user = await userModel.findById(userPayload.id);
    const userDto = new UserDto(user);

    // token
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }








  async checkUser(user) {
    return user;
  }

  async checkAdmin(user, res) {
    if (user.role !== "admin") {
      res.status(401).json({ message: "sizga bu yerga kira olmaysiz" });
    }
  }

  // for frontend
  async getAll() {
    const users = await userModel.find();
    let newUsers = users.map((item) => {
      return new UserDto(item);
    });
    return newUsers;
  }

  async changeStatus(data) {
    const checkRole = await userModel.findById(data.id);
    if (checkRole.role !== "admin") {
      const changedUser = await userModel.findByIdAndUpdate(
        data.id,
        { activated: !data.activated },
        { new: true }
      );
      return new UserDto(changedUser);
    } else {
      throw new Error("Mumkin emas !");
    }
  }

  async deleteUser(admin, id) {
    const user = await userModel.findById(id);
    if (admin.role === "admin" && user.role !== "admin") {
      await userModel.findByIdAndDelete(id);
    } else {
      throw new Error("Sizga mumkin emas");
    }
  }
}

module.exports = new AuthService();
