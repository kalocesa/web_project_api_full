import Main from "./Main/Main";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { InfoTooltip } from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import goodRegister from "../images/register-good.png";
import badRegister from "../images/register-bad.png";
import { getToken, removeToken, setToken } from "../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState({ img: "", text: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRegister = async (email, password) => {
    try {
      const response = await auth.register(email, password);
      if (response.status === 200 || response.status === 201) {
        setTooltipInfo({
          img: goodRegister,
          text: "¡Correcto! Ya estás registrado.",
        });
        navigate("/signin");
      } else {
        setTooltipInfo({
          img: badRegister,
          text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      setTooltipInfo({
        img: badRegister,
        text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
      });
    }
    setIsTooltipOpen(true);
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await auth.login(email, password); // auth.login ya devuelve JSON

      if (data.token) {
        setToken(data.token);

        setTooltipInfo({
          img: goodRegister,
          text: "¡Correcto! Has iniciado sesión.",
        });
        setIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem("userEmail", email);
        navigate("/");
      } else {
        setTooltipInfo({
          img: badRegister,
          text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      setTooltipInfo({
        img: badRegister,
        text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
      });
      console.error("Error al iniciar sesión:", error.message);
    }
    setIsTooltipOpen(true);
  };

  useEffect(() => {
    api.getProfileInfo().then((data) => {
      setCurrentUser(data);
    });
  }, [currentUser]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards); // Asegura que el estado se actualiza con las tarjetas correctamente
      })
      .catch((error) => console.error("Error al obtener las tarjetas:", error));
  }, [cards]);

  const handleUpdateUser = (data) => {
    api.editProfile(data.name, data.about).then((newData) => {
      console.log(newData);
      setCurrentUser(newData);
    });
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setLoading(false);
      return;
    }

    auth
      .checkToken(jwt)
      .then((userData) => {
        if (userData && userData.email) {
          setIsLoggedIn(true);
          setUserEmail(userData.email);
          navigate("/");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al verificar token:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;

  function handleLogout() {
    localStorage.removeItem("userEmail");
    removeToken();
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/signin", { replace: true });
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, setCurrentUser }}
    >
      <div className="page">
        <Header handleLogout={handleLogout} userEmail={userEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main cards={cards} setCards={setCards} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <Login handleLogin={handleLogin} setUserEmail={setUserEmail} />
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        <Footer />
        {isTooltipOpen && (
          <InfoTooltip
            img={tooltipInfo.img}
            text={tooltipInfo.text}
            handleClose={() => setIsTooltipOpen(false)}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
