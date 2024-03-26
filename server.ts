import { configDotenv } from "dotenv";
configDotenv();
import mongoose from "mongoose";
import app from "./src/app.ts";

const PORT = process.env.PORT || 3070;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce with start ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit Server Express");
    mongoose.disconnect().then(() => {
      console.log(`Disconnected mongoose!`);
    });
    // clearInterval(idCheckOverload);
  });
});
