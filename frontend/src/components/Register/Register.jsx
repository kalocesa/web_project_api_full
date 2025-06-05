import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="register_container">
      <h1 className="register_title">Regístrate</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="register_fieldset">
          <input
            className="register_input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register_input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button className="register_button" type="submit">
          Regístrate
        </button>
      </form>
      <p className="register_text">
        ¿Ya eres miembro? Inicia sesión{" "}
        <Link to={"/signin"} className="register_link">
          aquí
        </Link>
      </p>
    </div>
  );
};
