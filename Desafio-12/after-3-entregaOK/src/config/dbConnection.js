import mongoose from "mongoose";
import { options } from "./config.js";

try {
  await mongoose.connect(options.mongo.url)
  console.log(options.mongo.url);
} catch (error) {
    console.log(`Hubo un error conectandose a la base ${error}`);
}