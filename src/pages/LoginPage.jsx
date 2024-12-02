import React, { useState } from "react";
import api from "../services/Api";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Dati inviati:", { email, password });
      const response = await api.post("/auth/login", { email, password });
      console.log("Risposta del server:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error("Errore durante il login:", err.response || err.message);
      setError("Credenziali errate. Riprova.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password });
      alert("Registrazione completata! Ora puoi effettuare il login.");
      setIsLogin(true);
    } catch (err) {
      setError("Errore durante la registrazione. Riprova.");
    }
  };

  return (
    <div className="login-page">
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Registrati</button>
      </div>
      {isLogin ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Accedi</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h2>Registrazione</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrati</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;

