import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rootRouter from "./routes/rootRouter.ts";
import "./dbs/init.mongodb.ts";
import { endError, handleError } from "./helpers/handleError.helper.ts";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import { checkOverload } from "./helpers/check.connect.ts";
// checkOverload();

// init route
app.use(rootRouter);

// handle error
app.use(handleError)
app.use(endError)

export default app;
