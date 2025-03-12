import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPokemons = async (limit = 20, offset = 0) => {
  try {
    const response = await apiClient.get(`pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémon :", error);
    throw error;
  }
};
export const getPokemonDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    const speciesResponse = await axios.get(response.data.species.url); // Récupérer la traduction
    const frenchName = speciesResponse.data.names.find((n: any) => n.language.name === "fr")?.name || response.data.name;

    return {
      ...response.data,
      frenchName, // Ajoute le nom en français
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du Pokémon :", error);
    throw error;
  }
};


