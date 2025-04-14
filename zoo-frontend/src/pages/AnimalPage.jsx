import { useEffect, useState } from "react";
import axios from "axios";
import AnimalForm from "../components/AnimalForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimalList from "../components/AnimalList"; // Importando o AnimalList

function AnimalPage() {
  const [animais, setAnimais] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buscarAnimais();
  }, []);

  const buscarAnimais = async () => {
    try {
      const resposta = await axios.get("http://localhost:7010/api/animais"); // Atualizado para refletir a URL
      setAnimais(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar animais:", erro);
      toast.error("Erro ao buscar animais.");
    }
  };

  const excluirAnimal = async (id) => {
    if (confirm("Tem certeza que deseja excluir este animal?")) {
      try {
        await axios.delete(`http://localhost:7010/api/animais/${id}`);
        buscarAnimais();
        if (animalSelecionado === id) setAnimalSelecionado(null);
        toast.success("Animal excluído com sucesso!");
      } catch (erro) {
        console.error("Erro ao excluir animal:", erro);
        toast.error("Erro ao excluir animal.");
      }
    }
  };

  const iniciarEdicao = (animal) => {
    setModoEdicao(animal.id);
    setFormEdicao({ ...animal });
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
      await axios.put(`http://localhost:7010/api/animais/${modoEdicao}`, formEdicao);
      setModoEdicao(null);
      buscarAnimais();
      toast.success("Animal atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao editar animal:", erro);
      toast.error("Erro ao editar animal.");
    }
  };

  const irParaCuidados = (animalId) => {
    navigate(`/cuidados/${animalId}`);
  };

  return (
    <div className="container">
      <h1>Animais</h1>
      {modoEdicao && (
        <div>
          <AnimalForm
            animal={formEdicao}
            onChange={handleEditChange}
            onSubmit={salvarEdicao}
            onCancel={cancelarEdicao}
          />
        </div>
      )}
      {!modoEdicao && (
        <div>
          <button onClick={() => setModoEdicao("novo")}>Adicionar Novo Animal</button>
          {/* Agora, vamos renderizar a lista de animais através do AnimalList */}
          <AnimalList
            animais={animais}
            iniciarEdicao={iniciarEdicao}
            excluirAnimal={excluirAnimal}
            irParaCuidados={irParaCuidados}
          />
        </div>
      )}
    </div>
  );
}

export default AnimalPage;
