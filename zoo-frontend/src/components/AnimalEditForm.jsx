import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AnimalEditForm({ animal, setAnimalParaEditar, atualizarListaAnimais }) {
  const [form, setForm] = useState({ ...animal });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7010/api/animais/${form.id}`, form);
      toast.success("Animal atualizado com sucesso!");

      if (atualizarListaAnimais) {
        atualizarListaAnimais(response.data); // Atualiza na lista principal se função fornecida
      }

      setAnimalParaEditar(null); // Fecha o formulário de edição
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o animal.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Animal</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Espécie</label>
          <input
            type="text"
            name="especie"
            value={form.especie}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Habitat</label>
          <input
            type="text"
            name="habitat"
            value={form.habitat}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">País de Origem</label>
          <input
            type="text"
            name="paisOrigem"
            value={form.paisOrigem}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setAnimalParaEditar(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalEditForm;
