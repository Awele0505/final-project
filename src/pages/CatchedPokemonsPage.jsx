import React from 'react'
import { useSelector } from 'react-redux'
import { selectCatchedPokemons } from '../store'
import PokemonCard from '../components/PokemonCard'
import Breadcrumbs from '../components/Breadcrumbs'

const CatchedPokemonsPage = () => {
  const catchedPokemons = useSelector(selectCatchedPokemons)

  return (
    <div className="container">
      <Breadcrumbs items={[
        {
          name: 'Все покемоны',
          link: '/',
        },
        {
          name: 'Пойманные покемоны',
          link: '/catched-pokemons'
        }
      ]}/>
      {catchedPokemons.length === 0 && <div>Иди лови покемонов.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {catchedPokemons.map(pokemon => <PokemonCard key={pokemon.id} id={pokemon.id} showButton={false}/>)}
      </div>
    </div>
  )
}

export default CatchedPokemonsPage