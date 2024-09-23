# Profile Middleware SSE

## Índice

- [Introdução](#introdução)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Váriaveis de ambiente](#váriaveis-de-ambiente)

## Introdução

A SSE funciona como um middleware, que permite a conexão com os endpoints do OCC para criação e atualização de profile. O objetivo dessa SSE é fazer o gerenciamento de profiles no OCC.

## Requisitos

- node 18
- yarn 1.22.19

## Instalação

Para instalar e executar este projeto localmente, siga estas etapas:

1. Clonar repositório:

   ```bash
   git clone <repository-url>
   cd profile-middleware
   ```

2. Instalar dependências:

   ```bash
   yarn install
   ```

3. Rodar ambiente local:

   ```bash
   yarn dev
   ```

4. Rodar build do projeto para fazer upload da SSE:

   ```bash
   yarn build
   ```

5. Após rodar o build do projeto seguindo o step 4, realize a compactação do projeto em um arquivo .zip de forma normal, incluindo todas as pastas e arquivos. Faça upload da SSE no OCC.

## Endpoints

| Método | Caminho                              | Descrição                                                                                                                                                |
| ------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /ccstorex/custom/v1/profiles         | Criar profile em store no OCC. Para o funcionamento correto é necessário passar o atributo "Cookie" na requisição. Esse atributo é nativo do próprio OCC |
| PUT    | /ccstorex/custom/v1/profiles/current | Atualiza profile em store no OCC. Para o funcionamento correto é necessário passar o token do usuário logado no atributo "Authorization" na requisição.  |

### cURL de endpoints da SSE para rodar em abiente local:

1. cURL criação de profile:

```bash
curl --location 'http://127.0.0.1:8005/v1/profiles' \
--header 'Cookie: [cookie_data]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "autoLogin": "false",
    "firstName": "Alexandre",
    "lastName": "Silva",
    "gren_phoneNumber": "11999999999",
    "gren_cpf": "25954757038",
    "login": "b2clg-jeyidi7843@jzexport.com",
    "email": "jeyidi7843@jzexport.com",
    "emailConfirmation": "jeyidi7843@jzexport.com",
    "password": "Teste12345@",
    "receiveEmail": "no",
    "siteId": "B2CLG"
}'
```

2. cURL atualização de profile:

```bash
curl --location --request PUT 'http://127.0.0.1:8005/v1/profiles/current' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [authorization_token]' \
--data-raw '{
    "email": "arpsdesigner@gmail.com",
    "firstName": "Alexandre",
    "lastName": "Silva",
    "dateOfBirth": "1996-01-10",
    "gren_cpf": "34553146002",
    "gren_phoneNumber": "11975882144",
    "gren_preferenceSize": "33/34"
}'
```

### cURL de endpoints da SSE para rodar em OCC Store:

1. cURL criação de profile:

```bash
curl --location 'https://a7727193c1tst-store.occa.ocs.oraclecloud.com/ccstorex/custom/v1/profiles' \
--header 'Cookie: [cookie_data]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "autoLogin": "false",
    "firstName": "Alexandre",
    "lastName": "Silva",
    "gren_phoneNumber": "11999999999",
    "gren_cpf": "25954757038",
    "login": "b2clg-jeyidi7843@jzexport.com",
    "email": "jeyidi7843@jzexport.com",
    "emailConfirmation": "jeyidi7843@jzexport.com",
    "password": "Teste12345@",
    "receiveEmail": "no",
    "siteId": "B2CLG"
}'
```

2. cURL atualização de profile:

```bash
curl --location --request PUT 'https://a7727193c1tst-store.occa.ocs.oraclecloud.com/ccstorex/custom/v1/profiles/current' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [authorization_token]' \
--data-raw '{
    "email": "arpsdesigner@gmail.com",
    "firstName": "Alexandre",
    "lastName": "Silva",
    "dateOfBirth": "1996-01-10",
    "gren_cpf": "34553146002",
    "gren_phoneNumber": "11975882144",
    "gren_preferenceSize": "33/34"
}'
```

## Váriaveis de ambiente

```bash
ADMIN_URL #URL ADMIN OCC
OCC_URL_STORE #URL STORE OCC
ENVIROMENT_KEY #APP KEY OCC
```
