import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Footer from './components/Footer'
import pokeball from './assets/pokeball.png'
import pokeballclosed from './assets/pokeballclosed.png'
import title from './assets/pokelister.png'
import heart from './assets/heart.png'
import heartpink from './assets/heartpink.png'
import './App.css'

function App() {

  const [input, setInput] = useState("");
  const [chosenPokemon, setChosenPokemon] = useState("");
  const [chosenImg, setChosenImg] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [nameValid, setNameValid] = useState(true);
  const [prevSprite, setPrevSprite] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [likedPokemon, setLikedPokemon] = useState([])
  const [likes, setLikes] = useState({});
  const [topRated, setTopRated] = useState([]);
  const [topSprites, setTopSprites] = useState([]);
  const [isTopLoading, setIsTopLoading] = useState(null);

  const showPokeball = !nameValid || !chosenPokemon || !chosenImg;
  const displayBoxes = [0, 1, 2, 3, 4, 5];

  class Pokemon {
    constructor (name, img) {
      this.name = name;
      this.img = img;
    }
  }


  async function getPrevSprite () {
    const sprite = await getSprite("gallade-mega");
    setPrevSprite(sprite);
  };

  async function getSprite (pokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      const data = await response.json();
      const sprite = data.sprites.front_default;
      return sprite;
    } catch (error) {
      console.error(`There was a problem with a fetch operation (Sprite fetch for ${pokemon})`)
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
      console.error("There was a problem with the fetch operation (pokemon selection)")
    }
  }

  async function handleTopRated () {
      setIsTopLoading(true);
      fetch("https://pokemon-backend-uutq.onrender.com/top-liked")
      .then(res => res.json())
      .then(data => {
        setTopRated(data);
        setIsTopLoading(false);
      })
  };

  useEffect(() => {
    if (topRated.length === 0) return;
    handleTopSprites();
  }, [topRated]);

  async function handleTopSprites () {
    for(let i = 0; i < topRated.length; i++) {
      const name = topRated[i].name;
      const sprite = await getSprite(name);
      setTopSprites(prev => ({...prev, [name]: sprite}));
    }
  };

  useEffect(() => {
    handleTopRated();
    getPrevSprite();
  }, [])

  useEffect(()=>{
    setIsLiked(likedPokemon.includes(chosenPokemon));
  }, [likedPokemon, chosenPokemon])

  useEffect(() => {
  if (!chosenPokemon) return;

  fetch(`https://pokemon-backend-uutq.onrender.com/likes/${chosenPokemon}`)
    .then(res => res.json())
    .then(data => {
      setLikes(prev => ({
        ...prev,
        [chosenPokemon]: data.likes
      }));
    });
  }, [chosenPokemon]);

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

  async function handleLike (pokemon) {
    setLikedPokemon(prev => prev.includes(pokemon) 
                    ? prev.filter(p => p !== pokemon) 
                    : ([...prev , pokemon]));                
    const res = await fetch((!likedPokemon.includes(pokemon)
      ? "https://pokemon-backend-uutq.onrender.com/like"
      : "https://pokemon-backend-uutq.onrender.com/unlike"), 
      {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ name: pokemon})
    });
    const data = await res.json();
    setLikes(prev => ({
      ...prev, [pokemon]: data.likes
    }));
  }

  return (
    <div className='h-screen'>
      <div className="title w-fit mx-auto pt-10">
      <img src={title} className='w-fit'/>
      </div>
      <div className='h-15' />
      <section className='maincontent text-center'>
        <div className='bg-darkazure py-5 px-3 mb-10 flex justify-center items-center border-black border-5 border-x'>
          <p className='text-[1.1rem] lg:text-[1.3rem] text-white h-fit'>Enter the name of a Pokémon and add it to a list of your favourites!</p>
        </div>
        <div className='mx-auto w-fit'>
          <input type="text" className="bg-white rounded-sm h-12 w-80 mb-5 mr-5 pl-2 text-[1rem] border-black border-4" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <button type='submit' id='submit' className='bg-amber-300 hover:bg-amber-100 transition-colors rounded-md mb-4 lg:mb-0 px-3 py-1 cursor-pointer' onClick={()=>fetchPokemon(input)}>Enter</button>
        </div>


        <div className='flex lg:flex-row flex-col items-center '>

          {/*Search Tip*/}

          <div className='lg:w-[25%] order-2 lg:order-0 w-70 flex flex-col justify-center items-center lg:ml-10 mb-5 lg:mb-0 py-10 rounded-md bg-darkazure h-fit border-black border-5'>
            <p className='text-white mx-5'>When searching for a Pokémon with a space in its name (including mega evolved Pokémon), use a <abbr>-</abbr> instead of a space. For example;</p>
            <figure className='mx-auto w-fit flex flex-col items-center justify-center'>
              <img src={prevSprite} alt="Mega Gallade" className='w-fit' />
              <span className='bg-white rounded-sm p-2 w-fit h-fit'>
                <figcaption className='text-black text-[1rem] inline-block'>
                  Gallade-Mega
                </figcaption>
              </span>
            </figure>
          </div>

          {/* Preview Figure */}

          <div className='order-1 lg:order-0 w-80 h-fit rounded-md mx-auto mb-10 px-8 py-7 bg-darkazure border-black border-5 flex flex-col items-center'>
            <figure className='prevfigure flex flex-col justify-middle items-center'>
              <div className='flex relative items-center justify-center border-black border-5 bg-white h-40 w-40 z-0 rounded-full overflow-hidden mb-5'>
                <img src={showPokeball ? pokeball : chosenImg} 
                    className={showPokeball ? "w-25 h-25 object-contain z-2" 
                                            : "w-37 h-37 object-contain z-2"}
                    alt={showPokeball ? "Empty Poké Ball" : chosenPokemon} 
                />                               
              
              </div>
                <span className='bg-white rounded-sm p-1 mb-2'>
                  <figcaption className='text-nowrap text-[1.3rem]'>{nameValid ? (chosenPokemon ? chosenPokemon : "No Pokémon Selected") : "Invalid Name!"}</figcaption>
                </span>
                <img src={isLiked ? heartpink : heart} onClick={() => handleLike(chosenPokemon)} hidden={!chosenPokemon || !nameValid} className='h-6 w-6 object-contain mb-3 cursor-pointer' />
                <p className='text-white mb-2' hidden={!chosenPokemon || !nameValid}>Total Likes: {likes[chosenPokemon] ?? 0}</p>
            </figure>
            <button disabled={pokemonList.length >= 6 || !chosenPokemon}
                    onClick={handleAdd}
                    className='bg-amber-300 hover:bg-amber-100 transition-colors rounded-md px-3 py-1 cursor-pointer'>Add
            </button>
          </div>

          {/*Top Rated List*/}

          <div className='order-3 lg:order-0 w-[25%] lg:mr-10 flex flex-col justify-center items-center'>
            <span className='bg-darkazure rounded-md border-black border-5 py-1 px-2.5 mb-2 w-fit'>
              <h2 className='text-white lg:text-[1.7rem] text-[1.4rem] text-nowrap'>Top Rated Pokémon</h2>
            </span>
            {isTopLoading ?
              <div>
                <img className='loadingBall' src={pokeballclosed} alt="Closed Pokeball" />
              </div>
            :
              <ul className='flex flex-col items-center'>
                {topRated.map((pokemon, index)=> {
                  return(
                  <li className='flex justify-start items-center border-black rounded-md lg:w-80 w-70 px-10 mb-2 border-4 bg-darkazure' key={index}>
                    <img className='object-contain lg:h-30 lg:w-30 h-25 w-25' src={topSprites[pokemon.name]} alt={pokemon.name} />
                    <div className='w-fit mx-auto text-center'>
                      <span className='bg-white rounded-sm p-1 mb-2'>
                      <p className='text-black text-nowrap inline-block'>{pokemon.name}</p>
                      </span>
                      <p className='text-white'>{`${pokemon.likes} like${(pokemon.likes !== 1 ) ? "s" : ""}`}</p>
                    </div>
                  </li>
                  )
                })}
              </ul>
            }
          </div>
        </div>

        {/*Pokemon Grid*/}

        <div className='grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 lg:gap-6 w-fit mb-15 mx-auto'>
          {displayBoxes.map((_, i) => {
            return (
              <div key={i} className='relative lg:h-68 lg:w-55 h-50 w-40 mx-1 lg:mx-5 my-5 flex items-center justify-center'>
                
                <span className='absolute inset-0 border-black border-5 bg-darkazure rounded-3xl' />

                {pokemonList[i] && (
                  <figure className='relative z-10 flex flex-col items-center'>
                    <img
                      src={pokemonList[i].img || pokeball}
                      alt={pokemonList[i].name}
                      className='lg:h-45 lg:w-45 h-30 w-30 object-contain'
                    />
                    <span className='bg-white rounded-sm p-1 lg:mb-3'>
                      <figcaption>{pokemonList[i].name}</figcaption>
                    </span>
                    <button
                      onClick={() => handleRemove(i)}
                      className='bg-amber-300 hover:bg-amber-100 lg:text-[1rem] text-[0.7rem] transition-colors rounded-md mt-1 lg:mt-0 px-3 py-1 cursor-pointer'
                    >
                      Remove
                    </button>
                  </figure>
                )}
              </div>
            );
          })}
        </div>
        <Footer />
      </section>
    </div>
  )
}

export default App
