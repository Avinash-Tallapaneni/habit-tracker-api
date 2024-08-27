import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
  port: process.env.PORT ?? 8000,
  limit: 2,
  page: 1,
};

export default serverConfig;
