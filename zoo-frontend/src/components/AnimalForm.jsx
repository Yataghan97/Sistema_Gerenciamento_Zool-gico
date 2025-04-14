import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; // Importando o hook para navegação

function AnimalForm({ aoCadastrar }) {
  const navigate = useNavigate(); // Hook para navegação
  const [form, setForm] = useState({
    nome: "",
    descricao: "", // Descrição que será usada como "cuidados"
    dataNascimento: "",
    especie: "",
    habitat: "",
    paisOrigem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const animalData = {
        ...form,
        cuidados: form.descricao, // Garantindo que a descrição seja enviada como cuidados
      };
      await axios.post("http://localhost:7010/api/animais", animalData);
      toast.success("Animal cadastrado com sucesso! 🐾");
      setForm({
        nome: "",
        descricao: "",
        dataNascimento: "",
        especie: "",
        habitat: "",
        paisOrigem: "",
      });
      if (aoCadastrar) aoCadastrar(); // callback pra atualizar a lista
    } catch (erro) {
      toast.error("Erro ao salvar o animal.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Cadastrar Novo Animal</h2>
      <div className="grid grid-cols-2 gap-4">
        <input className="border p-2" type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input className="border p-2" type="text" name="especie" placeholder="Espécie" value={form.especie} onChange={handleChange} required />
        <input className="border p-2" type="text" name="habitat" placeholder="Habitat" value={form.habitat} onChange={handleChange} required />
        <input className="border p-2" type="text" name="paisOrigem" placeholder="País de Origem" value={form.paisOrigem} onChange={handleChange} required />
        <input className="border p-2 col-span-2" type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required />
        <textarea className="border p-2 col-span-2" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
      </div>
      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Cadastrar
      </button>

      {/* Botão para voltar à página inicial */}
      <button 
        type="button" 
        onClick={() => navigate("/")} 
        className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Voltar à Página Inicial
      </button>
    </form>
  );
}

export default AnimalForm;
