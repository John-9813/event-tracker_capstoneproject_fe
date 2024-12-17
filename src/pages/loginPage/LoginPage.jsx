import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../../services/HttpService";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setSurname("");
    setError("");
    setRememberMe(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await HttpService.post("/auth/login", {
        email,
        password,
      });
      console.log("Token restituito dal server:", response.data.token);

      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }

      onLogin();
      navigate("/home");
    } catch (err) {
      console.error("Errore durante il login:", err);
      setError("Credenziali errate. Riprova.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Le password non coincidono. Riprova.");
      return;
    }
    try {
      await HttpService.post("/auth/register", {
        email,
        password,
        name,
        surname,
      });
      alert("Registrazione completata! Ora puoi effettuare il login.");
      setIsLogin(true);
      resetForm();
    } catch (err) {
      console.error("Errore durante la registrazione:", err);
      setError(
        err.response?.data?.message ||
          "Errore durante la registrazione. Riprova."
      );
    }
  };

  return (
    <div className="login-page d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-primary ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn btn-secondary ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Registrati
        </button>
      </div>
      {isLogin ? (
        <form onSubmit={handleLogin} className="form-login p-3 w-50 ">
          <h2 className="text-center">Login</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Nascondi" : "Mostra"}
              </button>
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="form-check-input"
            />
            <label className="form-check-label">Ricordami</label>
          </div>
          <button type="submit" className="btn btn-success">
            Accedi
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="form-register p-3">
          <h2 className="text-center">Registrazione</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Cognome:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Nascondi" : "Mostra"}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label>Conferma Password:</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Nascondi" : "Mostra"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Registrati
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
