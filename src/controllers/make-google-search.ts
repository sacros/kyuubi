import { MD5 } from "crypto-js"
import { ISearchData } from "../models/search-data"
import { search } from "../services/google-search"
import { insert, searchRecentHash } from "../services/search-data"
import * as R from "ramda"

export const processSearch = async (term: string) => {
  const hash = MD5(term.toLowerCase().replace(/ /g, '')).toString()
  const cache = await searchRecentHash(hash)
  if (cache) {
    return cache.result
  }
  const [success, googleSearchResult] = await search(term)

  if (!success) return []
  const transformedData = transformData(googleSearchResult.data)
  const dataToSave: ISearchData = {
    searchTerm: term,
    hash,
    result: transformedData
  }
  await insert(dataToSave)
  return stringifiedData(transformedData)
}

const transformData = (data) => {
  if (!parseInt(data.searchInformation.totalResults)) return []
  return data.items.map(item => R.pick(["title", "link", "snippet"], item))
}

const stringifiedData = (data) => {
  const responseString = data.reduce((acc, curr) => {
    acc.count += 1
    if (acc.count != 1) {
      acc.str += "\n\n"
    }
    acc.str += `${acc.count}.${curr.title}\n${curr.link}\n${curr.snippet}`
    return acc
  }, { count: 0, str: "" })
  return `Here are the search results:\n${responseString.str}`
}