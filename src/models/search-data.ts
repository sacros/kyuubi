import * as mongoose from "mongoose"

export interface ISearchData {
  searchTerm: string
  hash: string
  result: Array<{ title: string, link: string, snippet: string }>
}

type ISearchDataDocument = ISearchData & mongoose.Document

const SearchData = new mongoose.Schema({
  searchTerm: {
    type: String
  },
  hash: {
    type: String,
    index: true
  },
  result: {
    type: Array
  }
}, { timestamps: true })

SearchData.index({ searchTerm: "text" })

export const searchDataModel = mongoose.model<ISearchDataDocument>('SearchData', SearchData, 'searchData')
