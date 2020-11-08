import * as mongoose from "mongoose"
import { config } from "./config"

const url = config.DB_URI

export const initDB = async () => {
  await mongoose.connect(url, { useNewUrlParser: true })
  console.log("DB connection successful")
}
