import React, { useCallback } from 'react'
import { capitalizeFirstLetter } from '../helpers'
import { Link } from "react-router-dom";
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { selectPokemonById, catchPokemon, selectPokemonCatchedDate } from '../store'

const PokemonCard = ({ id, showButton = true }) => {
  const { link, name, image } = useSelector(selectPokemonById(id))
  const catchedDate = useSelector(selectPokemonCatchedDate(id))
  const catched = Boolean(catchedDate)
  const dispatch = useDispatch()
  const handleCatch = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(catchPokemon(id))
  }, [id, dispatch])

  return (
    <Link to={link} className="flex flex-col rounded-lg shadow-lg">
      <img src={image} alt={name} className="object-cover"/>
      <span className="p-4 text-lg font-semibold">
        {capitalizeFirstLetter(name)}
      </span>
      {showButton && <button 
        disabled={catched}
        className={cn('rounded p-2 text-white', {
          'bg-gray-300 cursor-not-allowed': catched,
          'bg-pink-300 hover:bg-pink-700': !catched
        })}
        onClick={handleCatch}>
          Поймать
        </button>
      }
    </Link>
  )
}
  
export default PokemonCard