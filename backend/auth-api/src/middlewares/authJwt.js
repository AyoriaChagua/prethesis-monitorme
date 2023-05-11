import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userid = decoded.id;

    const user = await User.findById(req.userid, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

const verifyRole = async (req, res, next, role) => {
  const user = await User.findById(req.userid);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (const element of roles) {
    if (element.name === role) {
      next();
      return;
    }
  }

  return res.status(403).json({ message: `Requires ${role} role` });
};

export const isAdmin = async (req, res, next) => {
  try {
    await verifyRole(req, res, next, "admin");
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isSupervisor = async (req, res, next) => {
  try {
    await verifyRole(req, res, next, "supervisor");
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
