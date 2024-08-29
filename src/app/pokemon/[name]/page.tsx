"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

export default function Page() {
  const params = useParams<{ name: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`
        );
        const data = await res.json();
        setPokemonDetails(data as PokemonDetails);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemonDetails();
  }, [params.name]);

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{pokemonDetails.name}</h1>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      <h2>Types</h2>
      <ul>
        {pokemonDetails.types.map((type, index) => (
          <li id="PokemonDetail" key={index}>{type.type.name}</li>
        ))}
      </ul>
      <h2>Stats</h2>
      <ul>
        {pokemonDetails.stats.map((stat, index) => (
          <li id="PokemonDetail" key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
