<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPokemon } from "../services/pokeapi";

const pokemonName = ref("pikachu");
const pokemonData = ref<any>(null);

const fetchPokemon = async () => {
  try {
    pokemonData.value = await getPokemon(pokemonName.value);
  } catch (error) {
    console.error("Impossible de charger le Pokémon", error);
  }
};

onMounted(fetchPokemon);
</script>

<template>
  <div>
    <h1>Pokémon : {{ pokemonData?.name }}</h1>
    <img :src="pokemonData?.sprites?.front_default" alt="Pokemon" v-if="pokemonData" />
  </div>
</template>
