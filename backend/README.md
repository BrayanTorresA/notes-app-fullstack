notes-app-backend

## Instalación

1. Clona este repositorio en tu máquina local.
2. Dentro de la carpeta backend
3. Ejecuta el comando

```bash
$ yarn install
```

4. Configura las credenciales en el archivo `.env`

```
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_USERNAME="tu-usuario"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="base-de-datos"
POSTGRES_SSL="false"
JWT_SECRET="palabra secreta"
```

## Ejecutar la aplicación

```bash
# desarrollo
$ yarn run start

# watch mode
$ yarn run start:dev

# producción
$ yarn run start:prod
```

## Uso

- La API estará disponible en `https://notes-app-fullstack-0i91.onrender.com`

## Documentación

- [local](http://localhost:3000/docs)

- [web](https://notes-app-fullstack-0i91.onrender.com/docs)

## Licencia

MIT: <https://rem.mit-license.org>
