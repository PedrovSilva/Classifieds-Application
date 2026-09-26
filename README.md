
# Classifieds Application

Aplicação full-stack para gerenciamento de classificados, desenvolvida com **.NET 8**, **React**, **Entity Framework Core** e **SQL Server**.

O projeto implementa uma API REST com operações completas de CRUD, validação, paginação e persistência em banco de dados, além de uma interface web para gerenciamento dos classificados.

![.NET](https://img.shields.io/badge/.NET-8-512BD4?logo=dotnet)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-CC2927?logo=microsoftsqlserver)
![Docker](https://img.shields.io/badge/Docker-Dev%20Container-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions)

---

## Sobre o projeto

O **Classifieds Application** é uma aplicação web para cadastro e gerenciamento de anúncios classificados.

O projeto foi estruturado para demonstrar uma aplicação full-stack utilizando uma API REST em .NET e uma interface React consumindo os endpoints através de Axios.

### Principais funcionalidades

- Cadastro de classificados
- Listagem de classificados
- Consulta por ID
- Edição de classificados
- Exclusão de classificados
- Paginação
- Validação dos dados
- Ordenação por data de cadastro
- Persistência com Entity Framework Core
- Banco de dados SQL Server
- Swagger/OpenAPI
- Ambiente de desenvolvimento com Docker
- Dev Container
- Testes automatizados no backend
- CI com GitHub Actions

---

## Arquitetura

```text
┌───────────────────────────────┐
│           React 18            │
│                               │
│  Components + Axios +         │
│  Reactstrap + Bootstrap       │
└───────────────┬───────────────┘
                │
                │ HTTP / JSON
                ▼
┌───────────────────────────────┐
│          .NET 8 API           │
│                               │
│        Controllers            │
│             ↓                 │
│          Services             │
│             ↓                 │
│        Entity Framework       │
└───────────────┬───────────────┘
                │
                │ SQL
                ▼
┌───────────────────────────────┐
│        SQL Server 2022        │
└───────────────────────────────┘
````

---

## Estrutura do projeto

```text
Classifieds-Application/
│
├── .github/
│   └── workflows/
│       ├── backend.yml
│       └── frontend.yml
│
├── ClassificadosApi/
│   ├── Controllers/
│   ├── Context/
│   ├── DTOs/
│   ├── Models/
│   ├── Services/
│   ├── Migrations/
│   ├── Program.cs
│   └── ClassificadosApi.csproj
│
├── ClassificadosApi.Tests/
│   ├── Controllers/
│   ├── Services/
│   └── ClassificadosApi.Tests.csproj
│
├── classificados-react/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .env.example
│
├── .devcontainer/
│   ├── Dockerfile
│   └── devcontainer.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# Tecnologias

## Backend

* C#
* .NET 8
* ASP.NET Core Web API
* Entity Framework Core
* SQL Server 2022
* Swagger / OpenAPI
* xUnit
* Entity Framework Core InMemory

## Frontend

* React 18
* Axios
* Reactstrap
* Bootstrap 5
* date-fns
* Create React App

## Infraestrutura

* Docker
* Docker Compose
* Dev Container
* GitHub Actions

---

# API

Base URL:

```text
/api/Classificados
```

## Listar classificados

```http
GET /api/Classificados?page=1&pageSize=10
```

Exemplo de resposta:

```json
{
  "items": [
    {
      "id": 1,
      "titulo": "Notebook usado",
      "descricao": "Notebook em ótimo estado.",
      "dataCadastro": "2026-09-26T18:00:00Z"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "totalItems": 1,
  "totalPages": 1
}
```

---

## Buscar por ID

```http
GET /api/Classificados/{id}
```

Exemplo:

```http
GET /api/Classificados/1
```

---

## Criar classificado

```http
POST /api/Classificados
Content-Type: application/json
```

Body:

```json
{
  "titulo": "Notebook usado",
  "descricao": "Notebook em ótimo estado."
}
```

---

## Atualizar classificado

```http
PUT /api/Classificados/{id}
Content-Type: application/json
```

Body:

```json
{
  "titulo": "Notebook atualizado",
  "descricao": "Notebook atualizado e em ótimo estado."
}
```

---

## Excluir classificado

```http
DELETE /api/Classificados/{id}
```

Resposta:

```http
204 No Content
```

---

# Validação

Os dados enviados para a API possuem validação.

### Título

* Obrigatório
* Mínimo: 3 caracteres
* Máximo: 80 caracteres

### Descrição

* Obrigatória
* Mínimo: 3 caracteres
* Máximo: 2500 caracteres

Além da validação no backend, o frontend possui validações equivalentes para melhorar a experiência do usuário.

---

# Paginação

A API utiliza paginação através dos parâmetros:

```text
page
pageSize
```

Exemplo:

```http
GET /api/Classificados?page=2&pageSize=10
```

O backend retorna os dados da página juntamente com as informações necessárias para navegação:

```json
{
  "items": [],
  "page": 2,
  "pageSize": 10,
  "totalItems": 25,
  "totalPages": 3
}
```

---

# Executando o projeto

## Pré-requisitos

* .NET 8 SDK
* Node.js 20+
* npm
* Docker
* Docker Compose

---

## 1. Clonar o projeto

```bash
git clone https://github.com/PedrovSilva/Classifieds-Application.git

cd Classifieds-Application
```

---

# 2. Configurar o backend

Configure a connection string através de variável de ambiente ou configuração local.

Exemplo:

```text
ConnectionStrings__DefaultConnection=Server=localhost,1433;Database=DBJornal;User Id=sa;Password=SUA_SENHA;TrustServerCertificate=True
```

---

# 3. Subir o SQL Server

```bash
docker compose up -d sqlserver
```

Verifique os containers:

```bash
docker compose ps
```

O SQL Server deve estar disponível em:

```text
localhost:1433
```

---

# 4. Executar a API

Entre na pasta:

```bash
cd ClassificadosApi
```

Execute:

```bash
dotnet restore
dotnet run
```

A API estará disponível em:

```text
http://localhost:5041
```

Swagger:

```text
http://localhost:5041/swagger
```

---

# 5. Executar o frontend

Em outro terminal:

```bash
cd classificados-react
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo:

```text
.env
```

Com:

```env
REACT_APP_API_URL=http://localhost:5041/api
```

Execute:

```bash
npm start
```

O frontend estará disponível em:

```text
http://localhost:3000
```

---

# Docker / Dev Container

O projeto possui configuração para desenvolvimento utilizando:

* Docker Compose
* Dev Container
* SQL Server
* .NET SDK
* Node.js

Para utilizar o ambiente com VS Code, abra o projeto e selecione:

```text
Dev Containers:
Reopen in Container
```

O ambiente fornece as ferramentas necessárias para executar o backend e frontend sem precisar instalar todo o ambiente diretamente no sistema operacional.

---

# Testes

Os testes automatizados do backend estão no projeto:

```text
ClassificadosApi.Tests
```

Executar:

```bash
dotnet test
```

Os testes cobrem principalmente:

* Criação
* Consulta
* Consulta de registro inexistente
* Atualização
* Atualização de registro inexistente
* Exclusão
* Exclusão de registro inexistente
* Paginação

---

# CI

O projeto utiliza GitHub Actions para validação automática.

Os workflows estão em:

```text
.github/workflows/
```

### Backend

```text
backend.yml
```

Executa:

```text
Restore
   ↓
Build
   ↓
Test
```

### Frontend

```text
frontend.yml
```

Executa:

```text
Install
   ↓
Test
   ↓
Build
```

Pull Requests e pushes nas branches principais acionam automaticamente os workflows.

---

# Banco de dados

O projeto utiliza Entity Framework Core para persistência.

As alterações de estrutura do banco são controladas através de migrations:

```text
ClassificadosApi/Migrations/
```

Para criar uma nova migration:

```bash
dotnet ef migrations add NomeDaMigration
```

Para aplicar as migrations:

```bash
dotnet ef database update
```

---

# Decisões de arquitetura

O backend utiliza uma separação simples entre:

```text
Controller
    ↓
Service
    ↓
Entity Framework Core
    ↓
SQL Server
```

Essa abordagem foi escolhida por ser proporcional ao tamanho da aplicação, evitando introduzir abstrações desnecessárias.

Os DTOs também são utilizados para separar os contratos da API das entidades persistidas.

---

# Próximas evoluções

* [x] CRUD de classificados
* [x] DTOs
* [x] Validação
* [x] Paginação
* [x] Swagger
* [x] Entity Framework Core
* [x] SQL Server
* [x] Docker / Dev Container
* [x] Testes do backend
* [x] CI com GitHub Actions
* [ ] Testes do frontend
* [ ] Tratamento global de erros da API
* [ ] Filtros e busca
* [ ] Ordenação configurável
* [ ] Autenticação e autorização
* [ ] Testes de integração
* [ ] Deploy automatizado

---

# Objetivo

Este projeto foi desenvolvido como uma aplicação full-stack para praticar e demonstrar conceitos de desenvolvimento de software, incluindo:

* Desenvolvimento de APIs REST
* Desenvolvimento frontend
* Persistência de dados
* Arquitetura em camadas
* DTOs
* Validação
* Paginação
* Testes automatizados
* Containerização
* Integração contínua

