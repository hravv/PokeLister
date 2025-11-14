import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pokeball from './assets/pokeball.png'
import title from './assets/pokelister.png'
import './App.css'

function App() {

  const [input, setInput] = useState("");
  const [chosenPokemon, setChosenPokemon] = useState("");
  const [chosenImg, setChosenImg] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [nameValid, setNameValid] = useState(true);

  class Pokemon {
    constructor (name, img) {
      this.name = name;
      this.img = img;
    }
  }

  async function fetchPokemon(input) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
      if (!response.ok) {
        setNameValid(false);
        throw new Error('Network response was not ok')
      }
      const data = await response.json();
      setNameValid(true);
      updatePokemonInfo(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation")
    }
  }

  function updatePokemonInfo (data) {
      setChosenImg(data.sprites.front_default);
      setChosenPokemon(capitalise(data.name));
  }

  function capitalise(input) {
    return String(input).charAt(0).toUpperCase() + String(input).slice(1);
  }

  function handleAdd () {
    if (pokemonList.length < 6) {
      setPokemonList([...pokemonList , new Pokemon(chosenPokemon, chosenImg)]);
    }
  }
  function handleRemove (index) {
    setPokemonList(pokemonList.filter((_, i) => i !== index));
  }
  return (
    <div className='h-full bg-blue-300'>
      <div className="title w-fit mx-auto pt-6">
      {/*<a href="https://fontmeme.com/pokemon-font/"><img src="https://fontmeme.com/permalink/250520/3d0199ed9ade02ff11817812eec9bc42.png" alt="pokemon-font" border="0" /></a>*/}
      <img src={title} className='w-fit'/>
      </div>
      <div className='h-20' />
      <section className='maincontent text-center'>
        <div>
          <p className='mb-15'>Enter the name of a Pokémon and add it to a list of your favourites!</p>
          <input type="text" className="bg-white rounded-sm" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <button type='submit' id='submit' onClick={()=>fetchPokemon(input)}>Enter</button>
        </div>
        <div className='w-80 h-100 rounded-md mx-auto px-8 py-10 bg-darkazure flex flex-col items-center'>
          <figure className='prevfigure flex flex-col justify-middle items-center'>
            <div className='w-fit flex justify-center align-middle'>
              <img src={nameValid ? (chosenPokemon ? chosenImg : pokeball) : pokeball} className="w-40 h-40 object-contain z-2" />
              <span className='bg-white h-40 w-40 absolute z-1 rounded-[50%]' />
            </div>
            <figcaption className='text-nowrap '>{nameValid ? (chosenPokemon ? chosenPokemon : "No Pokémon Selected") : "Invalid Name!"}</figcaption>
          </figure>
          <button disabled={pokemonList.length >= 6} onClick={handleAdd}>Add</button>
        </div>
        <div>
          <div className='grid grid-cols-3 grid-row-2 w-fit mx-auto'>
            <div />
          </div>
          <div className='grid grid-cols-3 grid-row-2 w-fit mx-auto'>{pokemonList.map((Pokemon, index)=> {
            return (
              <figure key={index} className='w-fit border border-black'>
              <img src={Pokemon.img} alt={Pokemon.name} />
              <figcaption>{Pokemon.name}</figcaption>
              <button onClick={()=>handleRemove(index)}>Remove</button>
            </figure>
            )
          }
          )}</div>
        </div>
      </section>
    </div>
  )
}

export default App
