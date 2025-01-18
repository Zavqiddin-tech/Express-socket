const jwt = require("jsonwebtoken");
const tokenModel = require("../model/token.model");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const existToken = await tokenModel.findOne({ user: userId });
    if (existToken) {
      existToken.refreshToken = refreshToken;
      return existToken.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    return await tokenModel.findByIdAndDelete({ refreshToken });
  }

  async findToken(refreshToken) {
    return await tokenModel.findOne({ refreshToken });
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }
  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();