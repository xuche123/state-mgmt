import { usePokemon } from "../usePokemon"

const SearchBox = () => {
  const { search, setSearch } = usePokemon()
  
  return (
    <input
      className="mt-5 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
      placeholder="Search"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
}

export default SearchBox