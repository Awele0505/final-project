import React from 'react'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../components/Breadcrumbs'
import { selectPokemonById, selectPokemonCatchedDate} from '../store'
import {
  useParams
} from "react-router-dom";

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
};

const formatDate = date => new Intl.DateTimeFormat('ru', options).format(date)

const PokemonPage = () => {
  const { id } = useParams()
  const pokemon = useSelector(selectPokemonById(id))
  const catchedDate = useSelector(selectPokemonCatchedDate(id))

  return (
    <div className="flex flex-col container mx-auto px-4">
      <Breadcrumbs items={[
        {
          name: 'Все покемоны',
          link: '/',
        },
        {
          name: pokemon.name,
          link: pokemon.link
        }
      ]}/>
      <h1 className="text-3xl">{pokemon.name}</h1>
      <img src={pokemon.image} className="w-96" alt={pokemon.name}></img>
      <span>
        Статус: {catchedDate ? `Пойман ${formatDate(new Date(catchedDate))}` : 'Не пойман'}
      </span>
    </div>
  )
}

export default PokemonPage