import { ISearchData, searchDataModel } from "../models/search-data"

export const searchRecentHash = async (hash: string) => {
  return searchDataModel.findOne({
    hash,
    createdAt: { "$gte": new Date(Date.now() - 24 * 3600 * 1000) }
  })
}

export const insert = async (searchData: ISearchData) => {
  await searchDataModel.create(searchData)
}

export const textSearch = async (term: string) => {
  return searchDataModel.find({
    $text: { $search: term }
  }).sort({ _id: -1 }).limit(10)
}