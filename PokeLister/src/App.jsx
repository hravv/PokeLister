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

  const showPokeball = !nameValid ? true : (!chosenPokemon);
  const displayBoxes = [0, 1, 2, 3, 4, 5];

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
    <div className='h-screen'>
      <div className="title w-fit mx-auto pt-6">
      {/*<a href="https://fontmeme.com/pokemon-font/"><img src="https://fontmeme.com/permalink/250520/3d0199ed9ade02ff11817812eec9bc42.png" alt="pokemon-font" border="0" /></a>*/}
      <img src={title} className='w-fit'/>
      </div>
      <div className='h-20' />
      <section className='maincontent text-center'>
        <div>
          <p className='mb-15'>Enter the name of a Pokémon and add it to a list of your favourites!</p>
          <input type="text" className="bg-white rounded-sm mb-5 mr-2 pl-2" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <button type='submit' id='submit' className='bg-amber-300 hover:bg-amber-100 transition-colors rounded-md px-3 py-1 cursor-pointer' onClick={()=>fetchPokemon(input)}>Enter</button>
        </div>

        <div className='w-80 h-90 rounded-md mx-auto mb-10 px-8 py-10 bg-darkazure flex flex-col items-center'>
          <figure className='prevfigure flex flex-col justify-middle items-center'>
            <div className='flex relative items-center justify-center bg-white h-40 w-40 z-0 rounded-full overflow-hidden mb-5'>
              <img src={showPokeball ? pokeball : chosenImg} 
                  className={showPokeball ? "w-25 h-25 object-contain z-2" 
                                          : "w-37 h-37 object-contain z-2"}
                  alt={showPokeball ? "Empty Poké Ball" : chosenPokemon} 
              />                               
            
            </div>
            <span className='bg-white rounded-sm p-1 mb-5'>
            <figcaption className='text-nowrap'>{nameValid ? (chosenPokemon ? chosenPokemon : "No Pokémon Selected") : "Invalid Name!"}</figcaption>
            </span>
          </figure>
          <button disabled={pokemonList.length >= 6}
                  onClick={handleAdd}
                  className='bg-amber-300 hover:bg-amber-100 transition-colors rounded-md px-3 py-1 cursor-pointer'>Add
                  </button>
        </div>


        {/*<div className='flex'>
          <div className='grid grid-cols-3 grid-row-2 w-fit mx-auto relative'>
            {displayBoxes.map((_ , i) => {
              return (
                <span key={i} className='bg-darkazure h-55 w-45 mx-5 my-5 z-1 rounded-lg' />
              )  
            })
            }

            {pokemonList.map((Pokemon, index)=> {
            return (
              <figure key={index} className='w-fit mx-4 z-1'>
                <img src={Pokemon.img} alt={Pokemon.name} className='h-45 w-45 object-contain' />
                <figcaption>{Pokemon.name}</figcaption>
                <button onClick={()=>handleRemove(index)}
                        className='bg-amber-300 hover:bg-amber-100 transition-colors rounded-md px-3 py-1 cursor-pointer'
                >Remove</button>
              </figure>
            )
          }
          )}</div>
        </div>*/}

        <div className='grid grid-cols-3 grid-rows-2 gap-6 w-fit mx-auto'>
          {displayBoxes.map((_, i) => {
            return (
              <div key={i} className='relative h-68 w-55 mx-5 my-5 flex items-center justify-center'>
                
                <span className='absolute inset-0 bg-darkazure rounded-3xl' />

                {pokemonList[i] && (
                  <figure className='relative z-10 flex flex-col items-center'>
                    <img
                      src={pokemonList[i].img}
                      alt={pokemonList[i].name}
                      className='h-45 w-45 object-contain'
                    />
                    <span className='bg-white rounded-sm p-1 mb-5'>
                      <figcaption>{pokemonList[i].name}</figcaption>
                    </span>
                    <button
                      onClick={() => handleRemove(i)}
                      className='bg-amber-300 hover:bg-amber-100 transition-colors rounded-md px-3 py-1 cursor-pointer'
                    >
                      Remove
                    </button>
                  </figure>
                )}
              </div>
            );
          })}
        </div>

          
      </section>
    </div>
  )
}

export default App
