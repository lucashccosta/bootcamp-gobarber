# GoBarber - Backend
> Faca no código!

###### BootCamp Rocketseat - GoBarber Backend. ######

## Instalação
#### Instalar Postgres
Dentro do diretório backend, instale o postgres
```sh
$ docker run --name rocketseat_gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
$ docker run rocketseat_gostack_postgres
```
Se desejar parar ou iniciar o container, digite os comandos abaixo
```sh
$ docker start rocketseat_gostack_postgres
$ docker stop rocketseat_gostack_postgres
```
## Migrations
#### TypeORM
Configurar o arquivo *ormconfig.json* informando o diretório das migrations:
```sh
...
"migrations": [
    "./src/database/migrations/*.ts"
],
"cli": {
    "migrationsDir": "./src/database/migrations"
}
...
```
Criar um novo script no *package.json* para utilizar o TypeORM Cli e criar as migrations:
```sh
...
"scripts": {
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
},
...
```
Para criar uma migration:
```sh
$ yarn typeorm migration:create -n CreateAppointments
```
Para rodar uma migration:
```sh 
$ yarn typeorm migration:run
```
Para reverter uma migration:
```sh 
$ yarn typeorm migration:revert
```
Para visualizar as migrations que já foram executadas:
```sh 
$ yarn typeorm migration:show
```
$ 
## Autor
Lucas Costa – [Linkedin](https://www.linkedin.com/in/lucashcruzcosta/) - [CodeSoftware](https://www.codesoftware.me)