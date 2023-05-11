
## Configuración
<h1>Microservicio de Autenticación</h1>
Este microservicio es responsable de manejar el proceso de autenticación de usuarios en el proyecto.

<h2>Funcionalidades</h2>
<h4>Registro de nuevos usuarios.</h4>
<h4>Inicio de sesión para usuarios registrados.</h4>
<h4>Verificación de la autenticidad de las credenciales de los usuarios.</h4>
<h2>Tecnologías utilizadas</h2>
<ul>
     <li>Node.js</li>
     <li>Express.js</li>
     <li>MongoDB</li>
     <li>JWT (JSON Web Tokens)</li>
     <li>ExpressValidator</li>
</ul>
<h2>Instalación</h2>
<p>Clona este repositorio en tu máquina local.
Instala las dependencias con el siguiente comando:</p>
<b>npm install</b>
<p>Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:</p>
`DB_URI=<URI_de_tu_base_de_datos>`
`JWT_SECRET=<secreto_para_generar_los_JSON_Web_Tokens>`
<p>Inicia el microservicio con el siguiente comando:</p>
<b>npm start</b>
<h2>Uso</h2>
<h3>Registro de nuevos usuarios</h3>
<p>Para registrar un nuevo usuario, haz una petición POST a la ruta /signup con los siguientes datos en el cuerpo de la petición:</p>

```json
{
  "name": "Nombre del usuario",
  "email": "Correo electrónico del usuario",
  "password": "Contraseña del usuario",
  "roles": ["admin"]
}
```

Si el registro es exitoso, recibirás un token:
```json
{
  "token": "<JSON Web Token>"
}
```

Inicio de sesión para usuarios registrados
Para iniciar sesión con un usuario registrado, haz una petición POST a la ruta /login con los siguientes datos en el cuerpo de la petición:
```json
{
  "email": "Correo electrónico del usuario",
  "password": "Contraseña del usuario"
}
```
Si las credenciales son correctas, recibirás una respuesta con el siguiente formato:
```json
{
  "token": "<JSON Web Token>"
}
```
Verificación de la autenticidad de las credenciales de los usuarios
Para verificar la autenticidad de las credenciales de un usuario, haz una petición GET a la ruta api/u/ (debes tener el role de admin)

Authorization: x-access-token <JSON Web Token>
Si el token es válido, recibirás una respuesta con el siguiente formato:
```json
{
    "_id": "6449acb67a5e25f3939dfb75",
    "username": "carl",
    "email": "carl@test.com",
    "password": "$2a$10$rDPcUycg4XRvEAOdbdEsvOFvPn3sKxi3AGFrtPyU2hrETzwBABwdS",
    "roles": [
      "64498ec5037a26bb27935eca"
    ],
    "createdAt": "2023-04-26T22:59:02.958Z",
    "updatedAt": "2023-04-26T22:59:02.958Z"
  }
```
En caso contrario, recibirás una respuesta con el siguiente formato:

```json
{
  "message": "Unauthorized"
}
```
