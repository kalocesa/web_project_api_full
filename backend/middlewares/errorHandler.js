const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Registra el error en la consola (para depuración)

  const statusCode = err.statusCode || 500; // Si el error tiene código, úsalo; si no, devuelve 500
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
