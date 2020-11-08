import Axios from "axios"
import { logger } from "../logger"
import { config } from "../config"

const httpClient = Axios.create({
  timeout: 15000000
})

export const search = async (term: string): Promise<[boolean, any?]> => {
  try {
    const response = await httpClient.get(
      config.GOOGLE_SEARCH_URL,
      {
        params: {
          key: config.GOOGLE_SEARCH_KEY,
          q: term,
          cx: config.GOOGLE_SEARCH_ENGINE_ID,
          num: config.GOOGLE_SEARCH_RESULT_LIMIT
        }
      }
    )
    return [true, response]
  } catch (err) {
    logger.error(`Error using google search API`)
    logger.error(err)
    return [false]
  }
}
