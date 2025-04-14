import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AnimalCuidados({ animalId }) {
  const [todosCuidados, setTodosCuidados] = useState([]);
  const [cuidadosAnimal, setCuidadosAnimal] = useState([]);
  const [novoCuidadoId, setNovoCuidadoId] = useState("");

  useEffect(() => {
    buscarCuidados();
    buscarCuidadosDoAnimal();
  }, [animalId]);

  const buscarCuidados = async () => {
    try {
      const res = await axios.get("http://localhost:7010/api/cuidados");
      setTodosCuidados(res.data);
    } catch (err) {
      console.error("Erro ao buscar todos os cuidados", err);
      toast.error("Erro ao buscar todos os cuidados.");
    }
  };

  const buscarCuidadosDoAnimal = async () => {
    try {
      const res = await axios.get(`http://localhost:7010/api/animais/${animalId}`);
      setCuidadosAnimal(res.data.animaisCuidados || []);
    } catch (err) {
      console.error("Erro ao buscar cuidados do animal", err);
      toast.error("Erro ao buscar cuidados do animal.");
    }
  };

  const adicionarCuidado = async () => {
    try {
      await axios.post(`http://localhost:7010/api/animais/${animalId}/cuidados/${novoCuidadoId}`);
      toast.success("Cuidado adicionado com sucesso!");
      setNovoCuidadoId("");
      buscarCuidadosDoAnimal();
    } catch (err) {
      console.error("Erro ao adicionar cuidado", err);
      toast.error("Erro ao adicionar cuidado.");
    }
  };

  const removerCuidado = async (idCuidado) => {
    try {
      await axios.delete(`http://localhost:7010/api/animais/${animalId}/cuidados/${idCuidado}`);
      toast.success("Cuidado removido com sucesso!");
      buscarCuidadosDoAnimal();
    } catch (err) {
      console.error("Erro ao remover cuidado", err);
      toast.error("Erro ao remover cuidado.");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Cuidados do Animal</h3>
      <ul className="mb-4">
        {cuidadosAnimal.map((cuidado) => (
          <li key={cuidado.id} className="mb-1">
            {cuidado.nome}
            <button
              onClick={() => removerCuidado(cuidado.id)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <select
        value={novoCuidadoId}
        onChange={(e) => setNovoCuidadoId(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Selecione um cuidado</option>
        {todosCuidados.map((cuidado) => (
          <option key={cuidado.id} value={cuidado.id}>
            {cuidado.nome}
          </option>
        ))}
      </select>
      <button
        onClick={adicionarCuidado}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Adicionar Cuidado
      </button>
    </div>
  );
}

export default AnimalCuidados;
