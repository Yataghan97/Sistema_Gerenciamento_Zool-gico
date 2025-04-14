import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import AnimalPage from "./pages/AnimalPage";
import CuidadoPage from "./pages/CuidadoPage";
import LoginPage from "./pages/LoginPage"; // Importando a página de login
import AnimalEditPage from "./pages/EditAnimal"; // já está feito
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Função simples para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem("usuario") !== null; // Verifique se o usuário está autenticado
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/animais" replace />} />
        
        {/* Página de login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas protegidas */}
        <Route
          path="/animais"
          element={isAuthenticated() ? <AnimalPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cuidado"
          element={isAuthenticated() ? <CuidadoPage /> : <Navigate to="/login" />}
        />
        <Route
        path="/animais/editar/:id"
        element={isAuthenticated() ? <AnimalEditPage /> : <Navigate to="/login" />}
        />
         <Route
        path="/cuidados/:animalId"
        element={isAuthenticated() ? <CuidadoPage /> : <Navigate to="/login" />}
        />
        {/* Página para rotas não encontradas */}
        <Route path="*" element={<div className="p-6">Página não encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
