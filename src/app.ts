import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db

// init route
app.get("/", (req, res, next) => {
    const sttCompress = "hello compression"
  return res.status(200).json({
    message: "hello word",
    // metadata: sttCompress.repeat(30000)
  });
});

// init error

export default app;
