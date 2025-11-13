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
    pokemonList.splice(index, 1);
  }
  return (
    <>
      <div className="title w-fit mx-auto">
      {/*<a href="https://fontmeme.com/pokemon-font/"><img src="https://fontmeme.com/permalink/250520/3d0199ed9ade02ff11817812eec9bc42.png" alt="pokemon-font" border="0" /></a>*/}
      <img src={title} className='w-fit'/>
      </div>
      <section className='maincontent text-center'>
        <div>
          <p className=''>Enter the name of a Pokémon and add it to a list of your favourites!</p>
          <input type="text" id='textinput' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <button type='submit' id='submit' onClick={()=>fetchPokemon(input)}>Enter</button>
        </div>
        <div className='w-fit h-fit bg-indigo-200 mx-auto'>
          <figure id='prevfigure'>
            <div id='img-bg'>
              <img src={nameValid ? (chosenPokemon ? chosenImg : pokeball) : pokeball} id="previmage" className="w-[120px] h-[120px] object-contain" />
            </div>
            <figcaption>{nameValid ? (chosenPokemon ? chosenPokemon : "No Pokémon Selected") : "Invalid Name!"}</figcaption>
          </figure>
          <button id='add' disabled={pokemonList.length >= 6} onClick={handleAdd}>Add</button>
        </div>
        <div>
          <div id='img-grid'>{pokemonList.map((Pokemon, index)=> {
            return (
              <figure key={index}>
              <img src={Pokemon.img} alt={Pokemon.name} />
              <figcaption>{Pokemon.name}</figcaption>
              <button onClick={()=>handleRemove(index)}>Remove</button>
            </figure>
            )
          }
          )}</div>
        </div>
      </section>
    </>
  )
}

export default App
