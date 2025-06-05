export const BASE_URL = "https://api.aroundmx.mooo.com";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    return { status: response.status, data: responseJson };
  } catch (error) {
    console.log("Error en el registro:", error);
    return { status: 500, data: null };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud de login:", error.message);
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: Token inválido o formato incorrecto`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al verificar el token:");
    throw error;
  }
};
