import mongoose from "mongoose";
import shopModels from "./shop.model.ts";

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

// Declare the Schema of the Mongo model
const keyTokenSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: shopModels.name,
      },
      privateKey: {
         type: String,
         required: true,
      },
      publicKey: {
         type: String,
         required: true,
      },
      refreshTokensUsed: {
         type: Array,
         default: [],
      },
      refreshToken: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);

//Export the model
export default mongoose.model(DOCUMENT_NAME, keyTokenSchema);
