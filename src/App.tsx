import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import SearchBox from './components/SearchBox'
import { PokemonProvider } from './store'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Outlet, ReactLocation, Router } from '@tanstack/react-location'

const routes = [
  {
    path: '/',
    element: (
      <>
        <SearchBox />
        <PokemonList />
      </>
    )
  },
  {
    path: '/pokemon/:id',
    element: (
      <>
        <PokemonDetail />
      </>
    )
  },
]

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <PokemonProvider>
        <Router location={new ReactLocation()} routes={routes}>
          <div className='mx-auto max-w-2xl'>
            <Outlet />
          </div>
        </Router>
      </PokemonProvider>
    </QueryClientProvider>
  )
}
export default App
