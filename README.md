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

## siguiente proceso:


 ### 1. abrir docker

 una vez el docker abierto verificar si al hacer el comando que indicamos en el inicio se ha creado el contenedor con el nombre que le pusimos en el docker-compose.yml.

 ### 2. Abrir tablePlus o DBeaver

 una vez abierto el tablePlus o DBeaver, crear una nueva conexion a la base de datos:

 ```
 Host: localhost
 Port: 5432
 User: postgres
 Password: [PASSWORD]
 Database: teslodb
 ```

estos datos tienes que ponerlo en tableplus o dbeaver para verficar si se llega a conectar correctamente ('importante verificar que el docker este abierto y no tenga errores, tambien revisar tu archivo dockercompose.yml y el .env porque ahi defines los datos que vas a usar')

### 3. variables de entorno en nest

1. necesitas installar 'npm add @nestjs/config' (esto es para instalar las dependencias de las variables de entorno)

 Una vez instalado la dependencias ve a tu archivo app.module.ts y agrega lo siguiente:

 ```typescript
 import { Module } from '@nestjs/common';
 import { ConfigModule } from '@nestjs/config';

 @Module({
  imports: [ConfigModule.forRoot()], ## 'esto es para importar las variables de entorno es importante'
  controllers: [],
  providers: [],
})
export class AppModule { }

 ```

2. una vez instalado y configurado para tu variable de entorno, ahora para conectar a base de datos necesitamos instalar 'npm add @nestjs/typeorm typeorm pg' (esto es para instalar las dependencias de typeorm y postgres) 'npm add @nestjs/typeorm typeorm pg'

 -Despues de instalar eso nos vamos nuevamente a nuestro archivo app.module.ts y agregamos lo siguiente:

 ```typescript
 import { Module } from '@nestjs/common';
 import { ConfigModule } from '@nestjs/config';
 import { TypeOrmModule } from '@nestjs/typeorm';

 @Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
```

### 4 una vez hecho todo esto continuaremos con el entity pero antes usaremos el atajo de nest para que nos cree archivos rapidamente con el comando ' nest g res products --no-spec' se escoge en rest api

  ahora veras una carpeta creada ahi estara entity  pero tu tendras que importar :

  @Entity()
  export class Product {}

  

despues de importar , vas a decorar tus entitys con typeorm 


### realizar pruebas con el postman y verificar main.ts , para que agregues un globalprefix 


### despues vamos a la carpeta dto y instalamos class validator y class transform ( npm 'si en caso usas npm i class-validator class-transformer')

aca vamos a configurar el dto , es decir ahi vamos a configurar la data que estamos esperando de los usuarios , despues de ese paso decoramos con lo que importamos, leer el archivo create-product.dto.ts para ver como se configura.

terminando todo el testeo nos vamos a postman para verificar todo.


### despues de testear (' vamos a revisar los controllers y services para usar el @injectable )


aca unicamente nos vamos a service para mejorar la logica ya que de por si nest nos ayuda a crearlo rapidamente pero solo es por defautl


