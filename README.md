# Around MX 🌎

## Descripción del proyecto 📖

Around MX es una plataforma web diseñada para exploradores que desean documentar su viaje por México. Los usuarios pueden crear un perfil y añadir, editar o eliminar fotos de su recorrido, compartiendo sus experiencias con la comunidad.

Este proyecto fue creado por **Katia Sandoval** como entrega del **Sprint 18 de TripleTen**.

## Tecnologías utilizadas 🛠️

| Categoría                              | Tecnologías utilizadas      |
| -------------------------------------- | --------------------------- |
| **Frontend**                           | HTML, CSS, JavaScript, Vite |
| **Backend**                            | Node.js, Express, Mongoose  |
| **Gestión de procesos**                | PM2                         |
| **Despliegue**                         | Google Cloud                |
| **Diseño**                             | Figma                       |
| **Pruebas y documentación de API**     | Postman                     |
| **Control de acceso**                  | CORS                        |
| **Repositorio y control de versiones** | GitHub                      |

## Estructura del proyecto 📁

El código está organizado en las siguientes carpetas:

- `/backend`: Contiene la lógica del servidor, API y gestión de datos.
- `/frontend`: Contiene los archivos del cliente y la interfaz de usuario.

## Instalación y ejecución 🚀

Para clonar el repositorio y ejecutar el proyecto localmente:

```bash
git clone git@github.com:kalocesa/web_project_api_full.git
cd web_project_api_full
npm install
npm start
```

## Dominios y despliegue 🌐

El proyecto está accesible en los siguientes dominios:

- **API:** [api.aroundmx.mooo.com](http://api.aroundmx.mooo.com)
- **Frontend:** [www.aroundmx.mooo.com](http://www.aroundmx.mooo.com)
- **General:** [aroundmx.mooo.com](http://aroundmx.mooo.com)

## Funcionalidades principales 🎯

✅ Registro y autenticación de usuarios  
✅ Creación, edición y eliminación de fotos  
✅ Protección de rutas con JWT  
✅ Manejo centralizado de errores  
✅ Frontend completamente desplegado

## Códigos de estado de error ⚠️

El backend responde con códigos de estado según la situación:

- `400`: Datos inválidos
- `403`: Acceso denegado
- `404`: Recurso no encontrado
- `409`: Email ya registrado
- `500`: Error interno

## Contribuciones ✍️

Si deseas contribuir, envía un pull request.
