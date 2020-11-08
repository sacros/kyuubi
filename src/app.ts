import { initDB } from "./db"
import * as Discord from "discord.js"
import { config } from "./config"
import { processSearch } from "./controllers/make-google-search"
import { processRecent } from "./controllers/fetch-recents"
import { logger } from "./logger"


const client = new Discord.Client()

initDB()

const prefix = config.COMMAND_PREFIX

const process = async (msg: Discord.Message) => {
  if (msg.author.bot) return
  if (msg.content.toLowerCase() === "hi") return msg.reply(`Hey! ${msg.author.username}`)
  if (!msg.content.startsWith(prefix)) return

  const commandBody = msg.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift()?.toLowerCase()

  const term = args.join(" ")

  if (command === "google") {
    const response = await processSearch(term)
    return msg.reply(response)
  }

  if (command === "recent") {
    const response = await processRecent(term)
    return msg.reply(response)
  }
  return msg.reply("Hi! This is a discord bot. Get google search results using !google {your search query}")

}

client.on("message", async (msg) => {
  await process(msg)
})

const start = async () => {
  try {
    await client.login(config.BOT_TOKEN)
  } catch (err) {
    logger.error(err)
  }
}

start()
