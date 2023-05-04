import PokemonList from './components/PokemonList'
import SearchBox from './components/SearchBox'
import { PokemonProvider } from './store'

function App() {
  return (
    <PokemonProvider>
      <div className='mx-auto max-w-2xl'>
        <SearchBox />
        <PokemonList />
      </div>
    </PokemonProvider>
  )
}
export default App
