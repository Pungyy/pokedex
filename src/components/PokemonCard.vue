<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { getPokemonDetails } from "../services/pokeapi";

const typeTranslations: Record<string, string> = {
  normal: "Normal",
  fire: "Feu",
  water: "Eau",
  electric: "Électrique",
  grass: "Plante",
  ice: "Glace",
  fighting: "Combat",
  poison: "Poison",
  ground: "Sol",
  flying: "Vol",
  psychic: "Psy",
  bug: "Insecte",
  rock: "Roche",
  ghost: "Spectre",
  dragon: "Dragon",
  dark: "Ténèbres",
  steel: "Acier",
  fairy: "Fée"
};

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

export default defineComponent({
  name: "PokemonCard",
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const pokemonData = ref<any>(null);

    const fetchPokemon = async () => {
      try {
        pokemonData.value = await getPokemonDetails(props.url);
      } catch (error) {
        console.error("Impossible de charger les détails du Pokémon", error);
      }
    };

    onMounted(fetchPokemon);

    const backgroundColor = computed(() => {
      if (!pokemonData.value) return "white";
      const primaryType = pokemonData.value.types[0]?.type.name;
      return typeColors[primaryType] || "white";
    });

    return {
      pokemonData,
      typeTranslations,
      backgroundColor
    };
  }
});
</script>

<template>
  <div class="pokemon-card" v-if="pokemonData" :style="{ backgroundColor }">
    <div class="pokemon-hp">PV: {{ pokemonData.stats[0].base_stat }}</div>
    <h3>{{ pokemonData.frenchName }}</h3>
    <img :src="pokemonData.sprites.front_default" alt="Pokemon" />
    <p>Numéro Pokédex: #{{ pokemonData.id }}</p>
    <p>Type(s): 
      <span v-for="(type, index) in pokemonData.types" :key="index">
        {{ typeTranslations[type.type.name] || type.type.name }}
        <span v-if="index < pokemonData.types.length - 1">, </span>
      </span>
    </p>
    <p>Attaque: {{ pokemonData.stats[1].base_stat }}</p>
    <p>Défense: {{ pokemonData.stats[2].base_stat }}</p>
  </div>
</template>

<style scoped>
.pokemon-card {
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 220px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pokemon-hp {
  position: absolute;
  top: 10px;
  right: 10px;
  background: black;
  color: white;
  padding: 2px 3px;
  font-size: 13px;
  border-radius: 10px;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-card img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.pokemon-card p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
