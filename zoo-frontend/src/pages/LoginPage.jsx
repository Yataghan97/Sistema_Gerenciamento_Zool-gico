import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aqui você deve adicionar a lógica real de autenticação (verificando no backend, etc)
    if (email === "usuario@example.com" && senha === "12345") {
      // Autenticação bem-sucedida, armazenar no localStorage (ou estado global)
      localStorage.setItem("usuario", email);
      
      // Exibir uma notificação de sucesso
      toast.success("Login bem-sucedido!");

      // Redirecionar para a página de animais
      navigate("/animais");
    } else {
      // Se as credenciais forem inválidas
      toast.error("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2"
        />
      </div>
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Entrar
      </button>
    </div>
  );
}

export default LoginPage;
