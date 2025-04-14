import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AnimalEditForm from "../components/AnimalEditForm";

function AnimalEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`http://localhost:7010/api/animais/${id}`);
        setAnimal(response.data);
      } catch (error) {
        console.error("Erro ao buscar animal", error);
        navigate("/animais");
      }
    };

    fetchAnimal();
  }, [id, navigate]);

  return (
    <div className="p-6">
      {animal ? (
        <AnimalEditForm animal={animal} setAnimalParaEditar={() => navigate("/animais")} />
      ) : (
        <p>Carregando animal...</p>
      )}
    </div>
  );
}

export default AnimalEditPage;

