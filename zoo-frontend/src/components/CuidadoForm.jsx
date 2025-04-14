import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CuidadoForm({ aoCadastrar, animalId }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    frequencia: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia o cuidado para o back-end, associando ao animal com o animalId
      await axios.post(`http://localhost:7010/api/cuidados/animais/${animalId}/cuidados`, form);
      toast.success("Cuidado cadastrado com sucesso!");
      setForm({ nome: "", descricao: "", frequencia: "" });
      aoCadastrar(); // Atualiza a lista de cuidados
    } catch (erro) {
      toast.error("Erro ao cadastrar cuidado.");
      console.error(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome do cuidado"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="frequencia"
        value={form.frequencia}
        onChange={handleChange}
        placeholder="Frequência (diária, semanal, etc)"
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Cadastrar
      </button>
    </form>
  );
}

export default CuidadoForm;
