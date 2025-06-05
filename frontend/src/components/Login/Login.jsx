import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login_container">
      <h1 className="login_title">Inicia sesión</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="login_fieldset">
          <input
            className="login_input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login_input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button className="login_button" type="submit">
          Inicia sesión
        </button>
      </form>
      <p className="login_text">
        ¿Aún no eres miembro? Regístrate{" "}
        <Link to={"/signup"} className="login_link">
          aquí
        </Link>
      </p>
    </div>
  );
};
