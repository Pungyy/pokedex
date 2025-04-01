<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getPokemons } from "../services/pokeapi";
import PokemonCard from "../components/PokemonCard.vue";

const pokemons = ref<{ name: string; url: string }[]>([]);
const searchQuery = ref(""); // Barre de recherche
const limit = 100; // Nombre de Pokémon par page
const offset = ref(0); // Pour la pagination
const totalPokemons = ref(0);

const fetchPokemons = async () => {
  const data = await getPokemons(limit, offset.value);
  pokemons.value = data.results;
  totalPokemons.value = data.count;
};

onMounted(fetchPokemons);

// Filtrer les Pokémon selon la recherche
const filteredPokemons = computed(() => {
  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Changer de page
const nextPage = () => {
  if (offset.value + limit < totalPokemons.value) {
    offset.value += limit;
    fetchPokemons();
  }
};

const prevPage = () => {
  if (offset.value > 0) {
    offset.value -= limit;
    fetchPokemons();
  }
};
</script>

<template>
  <div>
    <!-- Barre de recherche -->
    <input v-model="searchQuery" placeholder="Rechercher un Pokémon" class="search-bar" />

    <!-- Liste des Pokémon -->
    <div class="pokemon-list">
      <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.name" :name="pokemon.name" :url="pokemon.url" />
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="offset === 0">⬅️ Précédent</button>
      <button @click="nextPage" :disabled="offset + limit >= totalPokemons">Suivant ➡️</button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.pokemon-card {
  flex: 1 1 calc(33.33% - 40px);
  max-width: 250px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #ffcb05;
  color: #000;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
