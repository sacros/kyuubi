import { textSearch } from "../services/search-data"

export const processRecent = async (term: string) => {
  /**
   * fetching only 10 most recent related searches
   */
  const results = await textSearch(term)
  if (!results) return []
  return `Your recent searches: ${results.map(x => x.searchTerm).join(", ")}`
}
