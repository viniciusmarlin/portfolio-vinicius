# Especificação de Requisitos - Encurtador de URLs (MVP em Memória)

## 1. Visão Geral do Produto
O objetivo deste MVP é validar o fluxo de trabalho de um serviço simples de encurtamento de URLs operando estritamente em memória (sem dependência de banco de dados externo ou persistência em disco). A aplicação será construída sobre o ecossistema **Java (Spring Boot)** com interação via **Interface de Linha de Comando (CLI)** e respostas no formato **JSON**.

---

## 2. Requisitos Funcionais (RF)

- **RF-01: Encurtamento de URL**
  - O sistema deve receber uma URL longa informada pelo usuário.
  - O sistema deve validar a sintaxe da URL.
  - O sistema deve gerar um identificador único de 6 caracteres alfanuméricos.
  - O sistema deve associar o código à URL longa e inicializar o contador de cliques em zero.

- **RF-02: Resolução de Código Curto**
  - O sistema deve receber um código curto de 6 caracteres.
  - Se o código existir, o sistema deve incrementar o contador de cliques em 1.
  - O sistema deve retornar a URL original encapsulada em um objeto JSON (Status 200).

- **RF-03: Consulta de Estatísticas**
  - O sistema deve permitir a consulta das métricas de um código curto informado.
  - O sistema deve retornar um objeto JSON contendo: código curto, URL original e total de acessos acumulados.

- **RF-04: Interface de Linha de Comando (CLI)**
  - O sistema deve disponibilizar comandos de terminal ou modo interativo para:
    1. Encurtar nova URL.
    2. Resolver/acessar URL a partir de um código curto.
    3. Exibir estatísticas de acessos.
    4. Sair da aplicação.

---

## 3. Requisitos Não Funcionais (RNF)

- **RNF-01: Linguagem e Framework:** Java 17+ utilizando Spring Boot (ex.: CommandLineRunner / Spring Shell).
- **RNF-02: Armazenamento em Memória:** Todos os dados devem residir exclusivamente na memória RAM da aplicação (ex.: `ConcurrentHashMap`), sem dependências de bancos relacionais ou NoSQL externos.
- **RNF-03: Formato de Resposta:** Todas as saídas de sucesso e de erro na CLI devem ser apresentadas em formato JSON padronizado.
- **RNF-04: Thread Safety:** As operações de leitura, escrita e incremento do contador devem ser seguras para acessos concorrentes (`AtomicInteger` ou estruturas atômicas equivalentes).
- **RNF-05: Tempo de Resposta:** As operações em memória devem executar em tempo O(1) de busca e gravação.

---

## 4. Regras de Negócio (RN)

- **RN-01 (Validação de URL):** A URL fornecida deve ser não-vazia e possuir protocolo válido (`http://` ou `https://`). URLs malformadas devem ser rejeitadas.
- **RN-02 (Formato do Código):** O código encurtado deve conter exatamente 6 caracteres pertencentes ao conjunto Base62 (`[a-zA-Z0-9]`).
- **RN-03 (Unicidade e Tratamento de Colisão):** O gerador de códigos deve garantir que não ocorra sobrescrita de códigos já existentes. Em caso de colisão, um novo código deve ser gerado.
- **RN-04 (Incremento Atômico de Cliques):** Cada consulta com sucesso para resolução da URL deve somar impreterivelmente +1 ao contador de cliques daquele registro.
- **RN-05 (Tratamento de Código Inexistente):** Ao consultar um código não registrado (seja para resolução ou estatísticas), o sistema deve retornar uma mensagem de erro em formato JSON indicando que o recurso não foi localizado.

---

## 5. Modelagem de Dados em Memória

Cada registro associado ao código curto deve conter:
- `shortCode`: String (6 caracteres, chave única)
- `originalUrl`: String (URL de destino)
- `clicks`: Inteiro atômico (iniciado em 0)
- `createdAt`: Timestamp ISO-8601 da criação

---

## 6. Formatos de Resposta (JSON)

### 6.1. Sucesso no Encurtamento
```json
{
  "status": "success",
  "data": {
    "shortCode": "aB3k9Z",
    "originalUrl": "https://www.google.com",
    "clicks": 0,
    "createdAt": "2026-11-23T14:30:00Z"
  }
}
```

### 6.2. Sucesso na Resolução (Acesso)
```json
{
  "status": "success",
  "data": {
    "shortCode": "aB3k9Z",
    "originalUrl": "https://www.google.com"
  }
}
```

### 6.3. Sucesso na Consulta de Estatísticas
```json
{
  "status": "success",
  "data": {
    "shortCode": "aB3k9Z",
    "originalUrl": "https://www.google.com",
    "totalClicks": 5
  }
}
```

### 6.4. Erro de Validação ou Não Encontrado
```json
{
  "status": "error",
  "message": "URL informada inválida. Deve iniciar com http:// ou https://"
}
```
```json
{
  "status": "error",
  "message": "Código curto não encontrado."
}
```

---

## 7. Critérios de Aceite

1. **Cenário 1: Encurtar URL válida**
   - *Dado* que o usuário informa a URL `"https://example.com/artigo-longo"`,
   - *Quando* o comando de encurtar for executado,
   - *Então* o sistema deve gerar um código de 6 caracteres alfanuméricos, armazenar o registro em memória e retornar o JSON correspondente com `clicks: 0`.

2. **Cenário 2: Rejeitar URL inválida**
   - *Dado* que o usuário informa a URL `"ftp://teste"` ou uma string arbitrária sem protocolo,
   - *Quando* o comando de encurtar for executado,
   - *Então* o sistema deve retornar erro em JSON indicando URL inválida e não criar registro.

3. **Cenário 3: Resolução de código existente e incremento de cliques**
   - *Dado* que existe um código `"xY7z1A"` com 0 cliques,
   - *Quando* o usuário solicita a resolução de `"xY7z1A"`,
   - *Então* o sistema deve retornar a URL original em JSON e o contador de cliques deve passar para 1.

4. **Cenário 4: Consulta de código inexistente**
   - *Dado* que o código `"000000"` não existe na base em memória,
   - *Quando* o usuário tentar resolver ou consultar estatísticas,
   - *Então* o sistema deve retornar mensagem de erro clara em formato JSON.

5. **Cenário 5: Verificação de estatísticas**
   - *Dado* que um link foi resolvido 3 vezes,
   - *Quando* o usuário solicitar as estatísticas do código correspondente,
   - *Então* o sistema deve retornar o JSON com `totalClicks: 3` sem incrementar o contador.
