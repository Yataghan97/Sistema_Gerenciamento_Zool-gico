### Sistema de Gerenciamento de Zoológico
Este projeto é uma aplicação completa de gerenciamento de zoológico, com uma API desenvolvida em .NET Core para gerenciar animais, cuidados e a associação entre eles. O front-end foi desenvolvido em React para facilitar a interação com a API e o gerenciamento dos dados.

Índice

Visão Geral

Tecnologias Utilizadas

Instalação e Execução

Endpoints da API

Testando a API

Contribuição


### Visão Geral
O sistema de gerenciamento de zoológico permite:

Gerenciar informações sobre animais, como nome, tipo e características.

Gerenciar cuidados que podem ser aplicados a animais, como vacinas, alimentação e exames.

Associar cuidados aos animais para manter o controle dos tratamentos e atividades.

Tecnologias Utilizadas

### Back-end
.NET Core: Framework para a criação da API RESTful.

Entity Framework Core: ORM utilizado para interação com o banco de dados.

SQL Server: Banco de dados relacional utilizado para armazenar as informações.

### Front-end
React: Biblioteca para criação de interfaces de usuário interativas.

Axios: Biblioteca para realizar requisições HTTP entre o front-end e a API.

### Instalação e Execução

Back-end (API)
 
1 - Clone o Repositório

2 - Configure o banco de dados: No arquivo appsettings.json, configure as credenciais do seu banco de dados SQL Server.

3 - Rode a Aplicação
    Se estiver usando o Visual Studio:

    Abra o projeto e execute com Ctrl + F5.

    Se estiver usando o CLI do .NET:
    dotnet run

A API será executada na URL http://localhost:7010.

### Front-end (React)

1 - Clone o repositório:

2 - Instale as dependências:
    npm install

3 - Execute a aplicação:
    npm start

O front-end será acessível em http://localhost:5173.

### Endpoints da API
A seguir, os principais endpoints da API para interagir com o sistema.

Animais
    GET /api/animais: Retorna todos os animais cadastrados.

    GET /api/animais/{id}: Retorna os detalhes de um animal específico.

    POST /api/animais: Cria um novo animal.

    PUT /api/animais/{id}: Atualiza os dados de um animal.

    DELETE /api/animais/{id}: Exclui um animal.

Cuidados
    GET /api/cuidados: Retorna todos os cuidados cadastrados.

    GET /api/cuidados/{id}: Retorna os detalhes de um cuidado específico.

    POST /api/cuidados: Cria um novo cuidado.

    PUT /api/cuidados/{id}: Atualiza um cuidado existente.

    DELETE /api/cuidados/{id}: Exclui um cuidado específico.

Associação de Cuidados a Animais
    POST /api/animais/{animalId}/cuidados: Associa um cuidado a um animal específico.

Exemplo de requisição para associar um cuidado a um animal:
    POST http://localhost:7010/api/animais/1/cuidados

{
  "nome": "Vacinação",
  "descricao": "Vacina anual contra raiva",
  "frequencia": "Anual"
}

Respostas esperadas:
    200 OK: Quando o cuidado é associado com sucesso.

    404 Not Found: Quando o animal ou cuidado não é encontrado.

### Testando a API
    Para testar a API localmente, você pode usar ferramentas como Postman ou Insomnia, ou até mesmo a linha de comando com curl.

### Teste básico com curl:
1 - Listar todos os animais:
    curl http://localhost:7010/api/animais
2 - Adcionar um novo cuidado
    curl -X POST http://localhost:7010/api/cuidados -H "Content-Type: application/json" -d '{"nome": "Vacinação", "descricao": "Vacina contra raiva", "frequencia": "Anual"}'
3 - Associar um cuidado a um animal:
    curl -X POST http://localhost:7010/api/animais/1/cuidados -H "Content-Type: application/json" -d '{"nome": "Vacinação", "descricao": "Vacina contra raiva", "frequencia": "Anual"}'



Email e senha da tela de login

Email = usuario@example.com
Senha = 12345


Dificuldades:

Como eu nunca trabalhei com C# e .NET, nem com React, tive muitas dificuldades para entender e iniciar o projeto. 

O que mais me custou tempo foi a integração entre o back-end e o front-end. Senti que o projeto ficou incompleto, 

pois não consegui aproveitar todo o tempo que me foi disponibilizado para realizá-lo.

No entanto, posso dizer que foi um desafio emocionante, especialmente porque gostei muito de aprender sobre a integração entre o back-end e o front-end, 

algo que nunca havia feito antes, já que sempre desenvolvi back-end em Python.

Acabei me enrolando na parte de cuidados e não consegui concluir totalmente essa etapa.

Agradeço muito pela oportunidade de realizar esse desafio. Foi uma experiência enriquecedora e fiquei animado com o que aprendi durante o processo.

