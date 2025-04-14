import { useEffect, useState } from "react";
import axios from "axios";
import CuidadoForm from "../components/CuidadoForm";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function CuidadoPage() {
  const [cuidados, setCuidados] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});
  const { animalId } = useParams();

  useEffect(() => {
    if (animalId) buscarCuidados();
  }, [animalId]);

  const buscarCuidados = async () => {
    try {
      const resposta = await axios.get(`http://localhost:7010/api/animais/${animalId}/cuidados`);
      setCuidados(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar cuidados:", erro);
      toast.error("Erro ao buscar cuidados.");
    }
  };

  const excluirCuidado = async (id) => {
    if (confirm("Tem certeza que deseja excluir este cuidado?")) {
      try {
        await axios.delete(`http://localhost:7010/api/cuidado/${id}`);
        buscarCuidados();  // Recarrega os cuidados após a exclusão
        toast.success("Cuidado excluído com sucesso!");
      } catch (erro) {
        console.error("Erro ao excluir cuidado:", erro);
        toast.error("Erro ao excluir cuidado.");
      }
    }
  };

  const iniciarEdicao = (cuidado) => {
    setModoEdicao(cuidado.id);
    setFormEdicao({ ...cuidado });
  };

  const cancelarEdicao = () => {
    setModoEdicao(null);
    setFormEdicao({});
  };

  const handleEditChange = (e) => {
    setFormEdicao({ ...formEdicao, [e.target.name]: e.target.value });
  };

  const salvarEdicao = async () => {
    try {
      await axios.put(`http://localhost:7010/api/cuidado/${modoEdicao}`, formEdicao);
      setModoEdicao(null);
      buscarCuidados();  // Recarrega a lista de cuidados após a edição
      toast.success("Cuidado atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao editar cuidado:", erro);
      toast.error("Erro ao editar cuidado.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cuidados do Animal {animalId}</h1>
      <CuidadoForm aoCadastrar={buscarCuidados} animalId={animalId} />
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Descrição</th>
            <th className="border p-2">Frequência</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cuidados.map((cuidado) => (
            <tr key={cuidado.id}>
              <td className="border p-2">{cuidado.id}</td>
              <td className="border p-2">
                {modoEdicao === cuidado.id ? (
                  <input name="nome" value={formEdicao.nome} onChange={handleEditChange} className="border p-1" />
                ) : cuidado.nome}
              </td>
              <td className="border p-2">
                {modoEdicao === cuidado.id ? (
                  <input name="descricao" value={formEdicao.descricao} onChange={handleEditChange} className="border p-1" />
                ) : cuidado.descricao}
              </td>
              <td className="border p-2">
                {modoEdicao === cuidado.id ? (
                  <input name="frequencia" value={formEdicao.frequencia} onChange={handleEditChange} className="border p-1" />
                ) : cuidado.frequencia}
              </td>
              <td className="border p-2">
                {modoEdicao === cuidado.id ? (
                  <>
                    <button onClick={salvarEdicao} className="bg-blue-500 text-white px-2 py-1 mr-2 rounded">Salvar</button>
                    <button onClick={cancelarEdicao} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => iniciarEdicao(cuidado)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Editar</button>
                    <button onClick={() => excluirCuidado(cuidado.id)} className="bg-red-600 text-white px-2 py-1 rounded">Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CuidadoPage;
