import * as dotenv from "dotenv"

dotenv.config()

const { env } = process

export const config = {
  DB_URI: env.DB_URI || "mongodb://localhost:27017/local",
  COMMAND_PREFIX: env.COMMAND_PREFIX || "!",
  BOT_TOKEN: env.BOT_TOKEN || "",
  GOOGLE_SEARCH_URL: env.GOOGLE_SEARCH_URL || 'https://www.googleapis.com/customsearch/v1/',
  GOOGLE_SEARCH_KEY: env.GOOGLE_SEARCH_KEY || "",
  GOOGLE_SEARCH_ENGINE_ID: env.GOOGLE_SEARCH_ENGINE_ID || "",
  GOOGLE_SEARCH_RESULT_LIMIT: parseInt(env.GOOGLE_SEARCH_RESULT_LIMIT || "") || 5
}
