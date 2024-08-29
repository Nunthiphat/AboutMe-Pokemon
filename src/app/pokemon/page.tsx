"use client";
import Link from "next/link";
import React from "react";
import styles from './PokemonList.module.css'; // Import CSS module for styling

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

export default function Page() {
  //create React state
  const [pokemonData, setPokemonData] = React.useState<PokemonList>(
    {} as PokemonList
  );

  //use React useEffect
  //to load API data at first time
  React.useEffect(() => {
    const getData = async () => {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((res) => {
          //set value to React state
          //force React to update UI
          const pokemonData: PokemonList = res as PokemonList;
          setPokemonData(pokemonData);
        })
        .catch((err) => console.error(err));
    };
    getData();
  }, []);

  const getPokemonIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const DisplayPokemonList = () => {
    if (pokemonData && pokemonData.results)
      return (
        <div className={styles.grid}>
          {pokemonData.results.map((p) => {
            const pokemonId = getPokemonIdFromUrl(p.url);
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

            return (
              <Link key={p.name} href={"/pokemon/" + p.name} className={styles.card}>
                <img src={imageUrl} alt={p.name} className={styles.image} />
                <h3 className={styles.name}>{p.name}</h3>
              </Link>
            );
          })}
        </div>
      );
    else return <p>Loading...</p>;
  };

  return (
    <div id="PokemonList">
      <h1>Pokemon</h1>
      <DisplayPokemonList />
    </div>
  );
}
