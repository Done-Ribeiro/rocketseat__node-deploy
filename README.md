# Guia de passos do projeto 🚀

## Aplicação:

```
1. npm init -y
2. npm install -D typescript @types/node tsx tsup
3. npx tsc --init
	criara o arquivo -> tsconfig.json

	nele alterar
		"target": "es2016"
	para
		"target": "es2020"
4. npm i fastify
5. npm i prisma -D
6. npm i @prisma/client
7. npx prisma init
8. Criar imagem docker do postgres
	docker pull postgres

	obs.: como eu já possuo um postgres local em minha maquina rodando na porta 5432
	preciso adaptar o container docker para rodar na porta 5433
	faço isto com o comando abaixo:

	docker run --name postgres -e POSTGRES_PASSWORD=123456 -p 5433:5432 -d postgres
9. Trocar o conteúdo da variável de ambiente
	.env para:
	DATABASE_URL="postgresql://postgres:123456@localhost:5433/nodedeploy?schema=public"
10. npx prisma migrate dev
	fará as alterações no bd conforme feito no schema do arquivo schema.prisma
	- crie um nome para a migration
		exemplo: create users
11. npx prisma studio
	para visualizar as tabelas (rodar o prisma)
12. npm i zod
13. Criar script de dev no package.json
	"dev": "tsx src/server.ts"
14. Como nosso projeto é simples, não precisamos subir um Dockerfile
	(que é muito recomendado principalmente para consistência de deploy)
	mas nesse caso faremos desta forma aqui, no package.json adicionaremos o seguinte:

		"engines": {
    	"node": "18"
  	},

15. Criar script de build no package.json
	"build": "tsup src"
16. npm run build
17. Criar script de start no package.json
	para ele rodar o arquivo 'buildado'

	"start": "node dist/server.js"
18. No .gitignore adicionar a pasta dist
19. Criar repositório no Git
```

## Build da Aplicação - Render

- Link do site: [https://dashboard.render.com](https://dashboard.render.com)

### 1. Crie um novo Banco de Dados Postgres

<img src="./docs/img/bd_1.png" />

Copie a chave Interna, é com ela que faremos a conexão
`DATABASE_URL` no Web Service

<img src="./docs/img/bd_2.png" />

### 2. Crie um novo Web Service

<img src="./docs/img/ws_1.png" />

...e cola a URL interna do banco de dados que copiamos da outra aplicação
<img src="./docs/img/ws_2.png" />

Clique no botão: Create Web Service
Nesse momento ele vai começar a fazer deploy da nossa aplicação

<img src="./docs/img/ws_3.png" />