import { config } from "dotenv";
config();

export const JWT_SECRET = process.env.JWT_SECRET || "test-secret";
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/monitormedb";
export const PORT = process.env.PORT || 4000;
