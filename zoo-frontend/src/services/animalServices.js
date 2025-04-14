// src/services/animalService.js
import axios from "axios";

// URL base da API
const API_URL = "http://localhost:7010/api/animais";

// Função para obter animais
export const getAnimais = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter os animais:", error.response ? error.response.data : error.message);
    throw error;  // Pode lançar o erro ou retornar um valor específico para o front
  }
};

// Função para criar um novo animal
export const createAnimal = async (animal) => {
  try {
    const response = await axios.post(API_URL, animal);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar o animal:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para atualizar um animal
export const updateAnimal = async (id, animal) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, animal);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o animal:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para excluir um animal
export const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir o animal:", error.response ? error.response.data : error.message);
    throw error;
  }
};
