import { usePokemon } from "../usePokemon"

const PokemonList = () => {
  const { pokemon, search } = usePokemon()
  return (
    <>
      {pokemon.length > 0 ?
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center mt-3 gap-6'>
          {search && pokemon.map(p => (
            <li
              key={p.id}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <img
                  className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                  alt=""
                />
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{p.name}</h3>
              </div>
            </li>
          ))}
        </ul> : (
          <div className="mt-5 flex justify-center items-center text-3xl text-red-500">No pokemon found!</div>
        )
    }
  </>
  )
}

export default PokemonList