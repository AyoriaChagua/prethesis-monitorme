import express from "express";
import morgan from "morgan";
import pkg from "../package.json" assert { type: "json" };
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createRoles } from "./libs/initialSetup.js";
import cors from "cors";

const app = express();
createRoles();

//variables
app.set("pkg", pkg);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

//routes
app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/u", userRoutes);

export default app;
