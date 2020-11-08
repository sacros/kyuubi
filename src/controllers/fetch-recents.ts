import { textSearch } from "../services/search-data"

export const processRecent = async (term: string) => {
  const results = await textSearch(term)
  if (!results) return []
  return `Your recent searches: ${results.map(x => x.searchTerm).join(", ")}`
}
