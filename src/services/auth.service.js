const { BadRequestError, AuthFailureError } = require("../core/error.response");
const UserTransformer = require("../transformers/user.transformer");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

class AuthService {
  static findUser = async (email) => {
    return await User.findOne({
      where: { email },
    });
  };

  static handleChangeInfo = async ({ password, idUser, name }) => {
    const foundUser = await User.findByPk(idUser);
    if (!foundUser) throw new BadRequestError("Not found User!");
    const hashPassword = bcrypt.hashSync(password, 10);
    await foundUser.update({
      password: hashPassword,
      name,
    });
  };

  static createUser = async (payload) => {
    const newUser = await User.create(payload);
    const userTransformer = new UserTransformer(newUser);
    return userTransformer;
  };

  static logout = async () => {};
}

module.exports = AuthService;
