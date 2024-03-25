import mongoose from "mongoose";
import app from "./src/app.ts";
import { idCheckOverload } from "./src/helpers/check.connect.ts";

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce with start ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit Server Express");
    mongoose.disconnect().then(() => {
      console.log(`Disconnected mongoose!`);
    });
    clearInterval(idCheckOverload);
  });
});
