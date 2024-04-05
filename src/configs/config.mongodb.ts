"use strict";

type TAppConfig = {
  port: string;
};
type TDbConfig = {
  host: string;
  port: string;
  name: string;
};
type TConfig = {
  app: TAppConfig;
  db: TDbConfig;
};

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || "3070",
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || "27017",
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || "3070",
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || "27017",
    name: process.env.PRO_DB_NAME || "shopPRO",
  },
};

const config: { [key: string]: TConfig } = { dev, pro };
const env = process.env.NODE_ENV || "dev";

console.log(config[env], env);
export default config[env];
