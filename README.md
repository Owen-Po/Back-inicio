<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Pasos para iniciar back con TypeOrm

1. crear carpeta donde estara tu back
2. dentro de la carpeta entra a cmd y ejecuta el comando: npm init -y (esto es si no tienes un package.json)
3. ejecuta el comando: npm install @nestjs/cli @nestjs/schematics -g (esto es para instalar el cli de nest globalmente)
4. ejecuta el comando: nest new teslos-shop (esto es para crear un nuevo proyecto de nest)
5. ejecuta el comando: cd teslos-shop (esto es para entrar al directorio del proyecto)
6. ejecuta el comando: npm run start:dev (esto es para iniciar el servidor en modo de desarrollo)
7. una vez creado el proyecto, ejecuta el comando: npm install @nestjs/typeorm typeorm pg (esto es para instalar las dependencias de typeorm y postgres)
8. elimina todo los archivos que no vas a necesitar (solo quedate con el app.module.ts y main.ts)

## paso 3 conectar con docker

1. crea un archivo docker-compose.yml en la raiz del proyecto:

```yaml
services:
  db:
    image: postgres:14.3 ## 'esto es la version que usaras para el postgres'
    container_name: teslodb ## 'esto es el nombre que le pondras al contenedor'
    restart: always ## 'esto es para que el contenedor se reinicie siempre'
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD} ## 'esto es la contraseña que usaras para el postgres("viene del .env")'
      POSTGRES_DB: ${DB_NAME} ## 'esto es el nombre de la base de datos que usaras para el postgres ("viene del .env")
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

2. crea un archivo .env en la raiz del proyecto:

```env  
DB_PASSWORD=123456 ## 'esto es la contraseña que usaras'
DB_NAME=teslodb ## 'esto es el nombre de la base de datos que usaras'
```

3. una vez qeu tengas todo eso ejecuta el comando: docker-compose up -d ( recuerda que el docker debe estar abierto y no tener errores)