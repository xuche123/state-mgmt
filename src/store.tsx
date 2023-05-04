import { createContext, useReducer, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'

interface Pokemon {
  id: number
  name: string
  type: string[]
  hp: number
  attack: number
  defense: number
  special_attack: number
  special_defense: number
  speed: number
}

function usePokemonSource(): { pokemon: Pokemon[], search: string, setSearch: (search: string) => void } {
  type PokemonState = {
    search: string
  }

  type PokemonAction = {
    type: "SET_SEARCH",
    payload: string
  }

  const {data: pokemon } = useQuery<Pokemon[]>(['pokemon'], async () => {
    const response = await fetch("pokemon.json")
    return response.json()
    },
    {
      initialData: [],
    }
  )
  
  const [{ search }, dispatch] = useReducer((state: PokemonState, action: PokemonAction) => {
    switch (action.type) {
        case "SET_SEARCH":
          return { ...state, search: action.payload };
      }
  }, {
    search: ""
  })
  
  // use useCallback in custom hooks when returning functions
  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", payload: search })
  }, [])  
  
  const filteredPokemon = useMemo(() => {
    return pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [pokemon, search])

  const sortedPokemon = useMemo(() => {
    return [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredPokemon])

  return {pokemon: sortedPokemon, search, setSearch}
}

export const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
)

export function PokemonProvider({children}: {children: React.ReactNode}) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  )
}