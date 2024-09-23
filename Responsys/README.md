# Responsys SSE

## Índice

- [Introdução](#introdução)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Endpoints](#endpoints)

## Introdução

A SSE envia informações para o responsys. Dentre essas informações estão:

1. Envio de informações ao entrar na PDP, request productOpened, "SUP_Navegacao". Melissa, Rider e LG.
2. Envio de informações ao clicar em qualquer collection, request collectionOpened, "SUP_Click_Results". Melissa, Rider e LG.
3. Envio de informações da wishList, request sendWishList, "SUP_Wishlist". Melissa e LG.
4. Envio de informações do do avise-me(PDP itens sem estoque) e newsletter. Melissa, Rider e LG.

## Requisitos

- node 18
- yarn 1.22.19

## Instalação

Para instalar e executar este projeto localmente, siga estas etapas:

1. Clonar repositório:

   ```bash
   git clone <repository-url>
   cd Responsys
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

| Método | Caminho                                     | Descrição                                                                     |
| ------ | ------------------------------------------- | ----------------------------------------------------------------------------- |
| POST   | /ccstorex/custom/responsys/productOpened    | Envia para o responsys o e-mail, produto e a origem(site ou mobile)           |
| POST   | /ccstorex/custom/responsys/collectionOpened | Envia para o responsys o e-mail, o link da coleção e a origem(site ou mobile) |
| POST   | /ccstorex/custom/responsys/sendWishlist     | Envia para o responsys o e-mail, SKU, cor, arquetipo e origem(site ou mobile) |
| POST   | /ccstorex/custom/responsys/sendFormRequest  | Envia para o responsys informações do avise-me(PDP) e newsletter              |

### cURL de endpoints da SSE para rodar em abiente local:

1. cURL : Anvio do avise-me, o exemplo é de Melissa. Rider e LG muda as informações de _ri_ e _di_ (para pegar esse payload, basta ir em TST e simular, puxar o payload e colar no postman).

```bash
curl --location 'http://127.0.0.1:3000/responsys/sendFormRequest' \
--header 'Content-Type: application/json' \
--data-raw '{
    "siteId": "B2CMN",
    "queryParams": {
        "_ri_": "X0Gzc2X%3DAQpglLjHJlDQGvy9yG9ue22GTw9buuzf766TuSu85ugIbUu6VwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGqiqYk3gRkjXUK4KsgWkw2wzaqzczazfOWc3zfBO",
        "_di_": "5g6pgp4vh5es4nm0ns2mub44sn4v6h07l3fq6gfd53abj8qj2f7g",
        "PAGINA_ORIGEM": "AvisemePDP",
        "PRODUTO_AVISO": "31953010030334",
        "EMAIL_AVISO": "rodrigo@teste.com",
        "EMAIL_ADDRESS_": "rodrigo@teste.com",
        "EMAIL_ORIGEM": "rodrigo@teste.com",
        "MOBILE_NUMBER_": "+55(41) 99989-8989",
        "EMAIL_PERMISSION_STATUS": "I",
        "ORIGEM_AVISO": "ECOMMERCE"
    }
}'
```

2. cURL : Anvio da newsletter, o exemplo é de Melissa. Rider muda as informações de _ri_ e _di_ (para pegar esse payload, basta ir em TST e simular, puxar o payload e colar no postman).

```bash
curl --location 'http://127.0.0.1:3000/responsys/sendFormRequest' \
--header 'Content-Type: application/json' \
--data-raw '{
    "siteId": "B2CMN",
    "queryParams": {
        "EMAIL_PERMISSION_STATUS_": "I",
        "_ri_": "X0Gzc2X%3DAQpglLjHJlDQGtSzeaE2UTKkcI4zdWaUvy4haYHKaCbRVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGuBPsGq8CGmzbzeSWzfzayfgEYHrfzccM2O",
        "_di_": "EnWqEHBn5zEmHdziIr6f9Mg",
        "ORIGEM_CLIENTE": "Newsletter",
        "EMAIL_ADDRESS_": "asdf@adf.com"
    }
}'
```

3. cURL : Anvio da newsletter Global, o exemplo é de LG. Melissa e Rider muda as informações de _ri_ e _di_ e _e_ (para pegar esse payload, basta ir em TST e simular, puxar o payload e colar no postman).

```bash
curl --location 'http://127.0.0.1:3000/responsys/sendFormRequest' \
--header 'Content-Type: application/json' \
--data-raw '{
    "siteId": "B2CLG",
    "queryParams": {
        "EMAIL_PERMISSION_STATUS_": "I",
        "MOBILE_COUNTRY_": "BR",
        "_ri_": "X0Gzc2X%3DAQjkPkSTTQGzcc6YMCn4Blzbr76gczf0RbMY8nBK8E2n2VwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQjkPkSTTQGzdaOK5YDokNjwRXJe81FHBh1vPYzeCOvD",
        "_di_": "r44meqn7gmovfgptp6thi2fd3q5bd0f90g46q72cl3rmcu3gp2k0",
        "_ei_": "EQlJP9fYUx_U9BTqLdO758Q",
        "ORIGEM_CLIENTE": "news_home_cartago",
        "EMAIL_ADDRESS_": "asdf@adf.com",
        "FIRST_NAME": "asdf",
        "FULL_NAME": "asdf",
        "MOBILE_NUMBER_": "+55(41) 99989-8989",
        "MOBILE_PERMISSION_STATUS_": "I",
        "TAM_CALCADO": "36"
    }
}'
```

## Constantes

```bash
export const RESPONSYS_ENABLED_LOCAL_VALUE #Esse valor é para teste local via postman (localhost).
export const RESPONSYS_ENABLED_FALSE #Esse valor deve ser sempre false, ele que ajuda na lógica junto a variável de ambiente.
```
