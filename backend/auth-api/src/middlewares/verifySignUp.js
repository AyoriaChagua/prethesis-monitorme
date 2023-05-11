import Role from "../models/Role.js";
import User from "../models/User.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user)
    return res
      .status(400)
      .json({ message: `The user ${user.username} already exists` });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res
      .status(400)
      .json({ message: `The email ${email.email} already exists` });

  next();
};

export const checkRoleExisted = async (req, res, next) => {
  const roles = await Role.find({}, { name: 1, _id: 0 });
  const roles_name = [];

  for (const role_name of roles) {
    roles_name.push(role_name.name);
  }

  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!roles_name.includes(role)) {
        return res.status(400).json({ message: `Role ${role} doesn't exists` });
      }
    }
  }
  next();
};
