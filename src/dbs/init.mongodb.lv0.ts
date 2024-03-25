import mongoose from "mongoose";

const connectString = `mongodb://localhost:27017/shopDev`;

mongoose
  .connect(connectString)
  .then(() => {
    console.log(`Connected Mongodb Success`);
  })
  .catch((err) => {
    console.log(`Error Connect!`);
  });

//dev
if (0 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

export default mongoose
