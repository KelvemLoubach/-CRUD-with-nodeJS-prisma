<h1>CRUD with Prisma + Node</h1>

Este é um exemplo de uma API RESTful para realização de operações CRUD em um banco de dados postgres utilizando o Prisma ORM e o Node.js.

<h2>Rotas disponíveis;</h2>

GET/users: Retorna uma lista de todos os usuários cadastrados no banco de dados.

GET /posts: Retorna uma lista de todos os posts cadastrados no banco de dados.

POST /createuser: Cria um novo usuário no banco de dados com as informações fornecidas no corpo da requisição.

POST /createpost: Cria um novo post no banco de dados com as informações fornecidas no corpo da requisição.

PUT /changepost/:id: Atualiza as informações de um post existente a partir do seu ID e das informações fornecidas no corpo da requisição.

DELETE /deletepost/:id: Remove um post existente do banco de dados a partir do seu ID.

DELETE /deleteuser/:id: Remove um usuário existente do banco de dados a partir do seu ID.



<h1>Como rodar a aplicação</h1>

Certifique-se de ter o <strong>Node.js</strong> instalado na sua máquina, você pode baixá-lo aqui: https://nodejs.org/en/

Clone o repositório da aplicação no seu computador, usando o comando git clone <URL do repositório>.

Acesse a pasta do projeto através do terminal.

Execute o comando npm install ou yarn install para instalar as dependências do projeto.

Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

PORT=3000
DATABASE_URL="postgresql://<usuario>:<senha>@<host>/<nome_do_banco>"

Execute o comando npm run prisma:migrate ou yarn prisma:migrate para executar as migrações do banco de dados.

Execute o comando npm run start-dev ou yarn start-dev para iniciar o servidor local.

Acesse o servidor através do navegador no endereço http://localhost:3000.

