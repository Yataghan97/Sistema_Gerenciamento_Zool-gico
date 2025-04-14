import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimalEditForm from "../components/AnimalEditForm";

function AnimalList() {
  const [animais, setAnimais] = useState([]);
  const [erro, setErro] = useState(null);
  const [animalParaEditar, setAnimalParaEditar] = useState(null);
  const navigate = useNavigate();

  const buscarAnimais = async () => {
    try {
      const response = await axios.get("http://localhost:7010/api/animais");
      setAnimais(response.data);
    } catch (error) {
      setErro("Erro ao carregar animais.");
    }
  };

  useEffect(() => {
    buscarAnimais();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7010/api/animais/${id}`);
      setAnimais(animais.filter((animal) => animal.id !== id));
      toast.success("Animal excluído com sucesso! 🐾");
    } catch (error) {
      toast.error("Erro ao excluir o animal.");
    }
  };

  const handleEdit = (animal) => {
    setAnimalParaEditar(animal);
  };

  if (erro) {
    return <div>{erro}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lista de Animais</h2>
      <ul className="space-y-4">
        {animais.map((animal) => (
          <li key={animal.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">
              {animal.nome} - {animal.especie} ({animal.habitat})
            </h3>
            <p className="text-sm text-gray-500">Descrição: {animal.descricao}</p>
            <p className="text-sm text-gray-500">
              Data de Nascimento:{" "}
              {new Date(animal.dataNascimento).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">País de Origem: {animal.paisOrigem}</p>

            <div className="mt-4">
              <h4 className="text-md font-semibold">Cuidados:</h4>
              {animal.animaisCuidados && animal.animaisCuidados.length > 0 ? (
                <ul className="list-disc pl-5">
                  {animal.animaisCuidados.map((cuidado, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {cuidado.cuidado?.nome ?? "Nome não disponível"} -{" "}
                      {cuidado.cuidado?.descricao ?? "Sem descrição"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Sem cuidados registrados.</p>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => navigate(`/animais/editar/${animal.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(animal.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Excluir
              </button>
              <button
                onClick={() => navigate(`/cuidados/${animal.id}`)} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cuidados
              </button>
            </div>
          </li>
        ))}
      </ul>

      {animalParaEditar && (
        <AnimalEditForm
          animal={animalParaEditar}
          setAnimalParaEditar={setAnimalParaEditar}
          setAnimais={setAnimais}
        />
      )}
    </div>
  );
}

export default AnimalList;
