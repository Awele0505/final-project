import React, { useCallback, useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
import { useSelector } from 'react-redux'
import { selectAllPokemons, selectCatchedPokemons } from '../store'
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce'

const useLoadMore = (data) => {
  const [page, setPage] = useState(0)

  const limit = 20
  const offset = page * limit

  const handleLoadMore = useCallback(() => {
    setPage(page + 1)
  }, [page])

  const dataWithPagination = data.slice(0, offset + limit)

  const allLoaded = dataWithPagination.length === data.length

  return [dataWithPagination, handleLoadMore, allLoaded]
}

const AllPokemonsPage = () => {
  const pokemons = useSelector(selectAllPokemons)
  const catchedPokemons = useSelector(selectCatchedPokemons)
  const [query, setQuery] = useState('')

  const [filtered, setFiltered] = useState(pokemons)

  const filterData = () => {
    setFiltered(pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()))) 
  }

  const debouncedFilterData = debounce((query) => {
    filterData(query);
   }, 300);

  useEffect(() => {
    debouncedFilterData(query)
  }, [query, debouncedFilterData])

  const changeHandler = event => {
    setQuery(event.target.value)
  };

  const [allPokemons, loadMore, allLoaded] = useLoadMore(filtered)

  return (
    <div className="container p-4">
      <Link to="/catched-pokemons">
        Пойманные покемоны ({catchedPokemons.length})
      </Link>
      <input className="border rounded-lg flex my-2" placeholder="Поиск" type="text" name="filter" value={query} onChange={changeHandler}></input>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {allPokemons.map(pokemon => <PokemonCard key={pokemon.id} id={pokemon.id}/>)}
      </div>
      {!allLoaded && (
        <button className="bg-pink-300 hover:bg-pink-700 p-4 rounded-lg mt-4 w-full text-white" onClick={loadMore}>
          Загрузить еще
        </button>
      )}
    </div>
  )
}

export default AllPokemonsPage