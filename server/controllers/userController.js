const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const checkUsername = await UserModel.findOne({ username });
    if (checkUsername)
      return res.json({ msg: "Username already used", status: false });
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail)
      return res.json({ msg: "Email already used", status: false });

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect username or password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({
      _id: { $ne: req.params.id },
    }).select(["email", "username", "avatarImage", "_id"]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
