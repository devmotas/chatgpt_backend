## Chatgpt Backend

Backend para controle e criação de usuarios, login e tambem auxiliar nas chamadas das APIs do Chatgpt.
Atualmente encontra-se no Google Firebase.

## Dependências

- axios: ^1.4.0
- cors: ^2.8.5
- dotenv: ^16.0.3
- express: ^4.18.2
- express-session: ^1.17.3
- firebase-admin: ^11.5.0
- firebase-functions: ^4.2.0
- mysql: ^2.18.1
- mysql2: ^3.3.3
- nodemon: ^2.0.22


## Instalação

Primeiro entre na pasta functions, que foi criada pelo Firebase.


    cd/functions

Certifique-se de ter o Node.js instalado. Clone o repositório e execute o seguinte comando no terminal para instalar as dependências:


    npm install

## Uso

Execute o seguinte comando no terminal para iniciar o projeto:

    npm run serve

Acesse (http://127.0.0.1:5001/chatgptbackend/us-central1/app/  rota) + rota para obter resposta do backend.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões, por favor, abra uma issue ou envie um pull request.

## Importante: Arquivo .env

O arquivo `.env` contém variáveis de ambiente sensíveis e não deve ser compartilhado publicamente no GitHub ou em qualquer plataforma de controle de versão. Certifique-se de adicionar o arquivo `.env` ao seu arquivo `.gitignore` para evitar o envio acidental para o repositório.

## Contato

Se você tiver alguma dúvida ou quiser entrar em contato, pode me encontrar em:

*   Email: devgustavomota@gmail.com
