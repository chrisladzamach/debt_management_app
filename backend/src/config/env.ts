import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  CORS_ORIGIN: (process.env.CORS_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map(s => s.trim()),
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_USER: process.env.DB_USER ?? "root",
  DB_PASS: process.env.DB_PASS ?? "",
  DB_NAME: process.env.DB_NAME ?? "debts_db"
};
