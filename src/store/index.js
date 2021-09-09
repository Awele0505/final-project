import { createSlice, configureStore } from '@reduxjs/toolkit'
import allPokemons from '../db.json'
import keyBy from 'lodash/keyBy'

const mapPokemon = (pokemon) => ({
  ...pokemon,
  link: `/pokemons/${pokemon.id}`,
  image: `/pokemons/${pokemon.id}.png`
})

const initialState = {
  pokemons: keyBy(allPokemons.pokemons.slice(0, 720).map(mapPokemon), 'id'),
  catchedPokemons: JSON.parse(localStorage.getItem('catched')) || {} // ТУТ
}

const { reducer, actions } = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    addPokemons(state, action) {
      state.pokemons = {
        ...state.pokemons,
        ...keyBy(action.payload, 'id')
      }
    },
    catchPokemon(state, action) {
      const pokemonId = action.payload
      state.catchedPokemons[pokemonId] = Date.now()
      localStorage.setItem('catched', JSON.stringify(state.catchedPokemons))
    }
  }
})

export const selectAllPokemons = state => {
  return Object.values(state.pokemons)
}

export const selectPokemonById = pokemonId => state => state.pokemons[pokemonId]

export const selectPokemonCatchedDate = pokemonId => state => state.catchedPokemons[pokemonId]

export const selectCatchedPokemons = state => Object.keys(state.catchedPokemons).map(pokemonId => selectPokemonById(pokemonId)(state))

export const {
  catchPokemon,
} = actions

export const store = configureStore({
  reducer
})
