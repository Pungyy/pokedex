<script setup lang="ts">

  import { ref, onMounted } from "vue";
  import { getPokemonDetails } from "../services/pokeapi";

  const props = defineProps<{ name: string; url: string }>();
  const pokemonData = ref<any>(null);

  const fetchPokemon = async () => {
    try {
      pokemonData.value = await getPokemonDetails(props.url);
    } catch (error) {
      console.error("Impossible de charger les détails du Pokémon", error);
    }
  };

onMounted(fetchPokemon);

</script>

<template>
  <div class="pokemon-card">
    <h3 v-if="pokemonData">{{ pokemonData.frenchName }}</h3>
    <img v-if="pokemonData" :src="pokemonData.sprites.front_default" alt="Pokemon" />
  </div>
</template>

<style scoped>
.pokemon-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-card img {
  width: 100px;
  height: 100px;
}

</style>