const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Se requiere autorización" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  // verificar el token
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return res.status(401).send({ message: "Se requiere authorizacion" });
  }
  req.user = payload;
  return next();
};
