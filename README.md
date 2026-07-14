# Task Management System

Sistema de gerenciamento de tarefas desenvolvido como teste técnico.

## Tecnologias Utilizadas

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT
- PostgreSQL
- Swagger / OpenAPI
- Actuator
- JUnit 5
- Mockito
- Docker

### Frontend

- Angular
- TypeScript
- HTML
- CSS

## Funcionalidades

- Autenticação via JWT
- CRUD completo de tarefas
- Busca por responsável
- Filtro por status
- Paginação
- Validação de dados
- Tratamento global de exceções
- Documentação da API com Swagger
- Monitoramento via Actuator
- Testes unitários
- Containerização com Docker

---

## Como executar

### Clone o projeto

```bash
git clone <git@github.com:Hoffnis/TaskManagement.git>
```

### Backend

Entre na pasta:

```bash
cd task-manager-backend
```

Configure o banco PostgreSQL no `application.properties`.

Execute:

```bash
mvn spring-boot:run
```

ou

```bash
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

---

### Frontend

Entre na pasta:

```bash
cd task-manager-frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
ng serve
```

Aplicação disponível em:

```
http://localhost:4200
```

---

## Docker

Execute:

```bash
docker compose up --build
```

---

## Documentação

Swagger:

```
http://localhost:8080/swagger-ui/index.html
```

Actuator:

```
http://localhost:8080/actuator/health
```

---

## Autenticação

Login:

```
POST /auth/login
```

Exemplo:

```json
{
  "username": "admin",
  "password": "123456"
}
```

Utilize o token JWT retornado para acessar os endpoints protegidos.

---

## Testes

Executar todos os testes:

```bash
mvn test
```

---

## Estrutura do projeto

```
task-management/
│
├── task-manager-backend/
│
└── task-manager-frontend/
```

## Decisões Arquitetais

A aplicação foi desenvolvida seguindo arquitetura em camadas (Controller, Service e Repository), com separação entre entidades de domínio e DTOs. Reduzindo o acoplamento, melhorando a organização do código e facilitando testes e manutenção.

A autenticação foi implementada utilizando Spring Security com JWT, permitindo uma API REST adequada para integração com o frontend. O tratamento de exceções foi centralizado através de um GlobalExceptionHandler, garantindo respostas padronizadas para erros da aplicação.

Para facilitar a implantação e execução em diferentes ambientes, a aplicação foi containerizada com Docker e documentada automaticamente utilizando Swagger/OpenAPI. Além disso, foram implementados testes unitários para as camadas de service e controller, bem como uma pipeline de integração contínua utilizando GitHub Actions para execução automática dos testes.

A implementação utilizando NamedJdbcTemplate foi identificada como um diferencial no enunciado. Considerando o tempo disponível e que os requisitos funcionais estavam plenamente atendidos com Spring Data JPA, priorizei a entrega das funcionalidades obrigatórias, autenticação JWT, testes automatizados, Docker e integração com o frontend.

---

## Autor

Desenvolvido por Hoffnis Nykollas.
