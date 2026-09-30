# Classifieds Application

Aplicação full-stack para publicar e administrar anúncios classificados. O projeto reúne uma interface React com uma API ASP.NET Core, autenticação JWT e persistência em SQL Server.

## Sobre o projeto

O objetivo foi construir um fluxo completo de gerenciamento de anúncios: visitantes podem consultar os classificados, enquanto usuários autenticados podem criar, editar e excluir anúncios. A listagem é paginada e exibe os anúncios mais recentes primeiro.

### Funcionalidades

- Navegação por classificados com paginação.
- Cadastro de usuário e login.
- Criação, edição e remoção de anúncios autenticados.
- Validação dos dados e respostas HTTP apropriadas para recursos inexistentes ou credenciais inválidas.
- Documentação interativa dos endpoints com Swagger no ambiente de desenvolvimento.

## Tecnologias e ferramentas

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 18, TypeScript, Axios, Reactstrap, Bootstrap |
| Backend | C#, .NET 8, ASP.NET Core Web API |
| Dados | Entity Framework Core, SQL Server, migrations |
| Autenticação | JWT e hash de senha |
| Desenvolvimento | Docker Compose, Dev Container, GitHub Actions |
| Testes | xUnit (serviços do backend) |

## Organização

```text
ClassificadosApi/       API, controllers, serviços, modelos e migrations
ClassificadosApi.Tests/ Testes automatizados do backend
classificados-react/    Interface React e TypeScript
.devcontainer/          Ambiente de desenvolvimento em container
docker-compose.yml      SQL Server e container de desenvolvimento
```

## Como executar

### Requisitos

- .NET 8 SDK
- Node.js 20+ e npm
- Docker Compose e uma senha forte para o SQL Server

### 1. Banco de dados e API

Na raiz do repositório, inicie o SQL Server:

```bash
export MSSQL_SA_PASSWORD='SuaSenhaForte123!'
docker compose up -d sqlserver
```

A connection string local em `ClassificadosApi/appsettings.Development.json` usa a senha `Classifieds123!StrongPassword`. Altere-a para coincidir com `MSSQL_SA_PASSWORD`, ou configure `ConnectionStrings__DefaultConnection` no ambiente.

A senha acima é apenas para desenvolvimento. Não use credenciais de exemplo fora do seu ambiente local.

Instale a ferramenta do Entity Framework (se ainda não estiver instalada), aplique as migrations e inicie a API:

```bash
dotnet tool install --global dotnet-ef
dotnet ef database update --project ClassificadosApi --startup-project ClassificadosApi
dotnet run --project ClassificadosApi
```

API: `http://localhost:5041`  
Swagger: `http://localhost:5041/swagger`

### 2. Frontend

Em outro terminal:

```bash
cd classificados-react
npm install
```

Crie `classificados-react/.env`:

```env
REACT_APP_API_URL=http://localhost:5041/api
```

Inicie a aplicação:

```bash
npm start
```

Frontend: `http://localhost:3000`.

## API em resumo

Base URL: `http://localhost:5041/api`.

| Método | Endpoint | Acesso |
| --- | --- | --- |
| `GET` | `/Classificados?page=1&pageSize=10` | Público |
| `GET` | `/Classificados/{id}` | Público |
| `POST` | `/Classificados` | JWT |
| `PUT` | `/Classificados/{id}` | JWT |
| `DELETE` | `/Classificados/{id}` | JWT |
| `POST` | `/Auth/register` | Público |
| `POST` | `/Auth/login` | Público |

Operações de escrita em classificados exigem `Authorization: Bearer <token>`. A API limita `pageSize` a 100 e valida os campos do anúncio. O Swagger contém os contratos de requisição e resposta.

## Testes e integração contínua

Para executar os testes automatizados do backend:

```bash
dotnet test ClassificadosApi.Tests/ClassificadosApi.Tests.csproj
```

Para compilar o frontend:

```bash
cd classificados-react
npm ci
npm run build
```

Os workflows do GitHub Actions executam build e testes do backend e build do frontend em pushes e pull requests para `main` e `frontend-refactor`.

## Decisões técnicas

- A API separa controllers, serviços, DTOs e entidades para manter os contratos HTTP independentes do modelo persistido.
- As consultas de leitura usam projeção para DTOs e não rastreiam entidades; a listagem aplica paginação no banco.
- Senhas são armazenadas como hash e as rotas protegidas validam tokens JWT.
- Migrations versionam a estrutura do banco e permitem recriá-la em um ambiente local.
