import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

console.log(`Process`, process.env.PORT);

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
import "./dbs/init.mongodb.ts";
// import { checkOverload } from "./helpers/check.connect.ts";
// checkOverload();

// init route
app.get("/", (req, res, next) => {
  const sttCompress = "hello compression";
  return res.status(200).json({
    message: "hello word",
    // metadata: sttCompress.repeat(30000)
  });
});

// init error

export default app;
