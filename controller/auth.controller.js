const authService = require("../service/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const {
        userName,
        password,
        activated,
        firstName,
        lastName,
        companyId,
        phone,
        role,
      } = req.body;
      const data = await authService.register(
        userName,
        password,
        activated,
        firstName,
        lastName,
        companyId,
        phone,
        role
      );

      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  async companyRegister(req, res, next) {
    try {
      const data = await authService.companyRegister(req.body);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }
  
  
  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      const data = await authService.login(userName, password);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.headers;
      const token = await authService.logout(refreshToken);
      res.json({ token });
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.headers;
      const data = await authService.refresh(refreshToken);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  // check
  async checkUser(req, res, next) {
    try {
      const admin = await authService.checkUser(req.user);
      return res.json(admin);
    } catch (error) {
      next(error)
    }
  }
  async checkAdmin(req, res, next) {
    try {
      const data = await authService.checkAdmin(req.user, res);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  // for frontend
  async getAll(req, res, next) {
    try {
      const data = await authService.getAll();
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  async changeStatus(req, res, next) {
    try {
      const data = await authService.changeStatus(req.body);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }
  
  async deleteUser(req, res, next) {
    try {
      const data = await authService.deleteUser(req.user, req.params.id);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new AuthController();
