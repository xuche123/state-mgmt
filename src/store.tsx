import { create } from "zustand";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export const usePokemon = create<{
  pokemon: Pokemon[];
  allPokemon: Pokemon[];
  setAllPokemon: (pokemon: Pokemon[]) => void;
  search: string;
  setSearch: (search: string) => void;
}>((set, get) => ({
  pokemon: [],
  allPokemon: [],
  setAllPokemon: (pokemon: Pokemon[]) =>
    set({
      allPokemon: pokemon,
      pokemon: searchAndSortPokemon(pokemon, get().search),
    }),
  search: "",
  setSearch: (search: string) =>
    set({
      search,
      pokemon: searchAndSortPokemon(get().allPokemon, search),
    }),
}));

const searchAndSortPokemon = (pokemon: Pokemon[], search: string) =>
  pokemon
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

fetch("/pokemon.json")
  .then((res) => res.json())
  .then((data) => {
    usePokemon.getState().setAllPokemon(data);
  });
