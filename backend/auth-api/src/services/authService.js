import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import Role from "../models/Role.js";

const signUp = async ({ username, email, password, roles }) => {
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "regular" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
    expiresIn: 86400, //un dia de expiracion
  });

  return token;
};

const signIn = async ({ email, password }) => {
  const userFound = await User.findOne({ email }).populate("roles"); //function for populate it according to role
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, JWT_SECRET, {
    expiresIn: 86400,
  });

  return token;
};

export default { signUp, signIn };
