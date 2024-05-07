# Desafio técnico Fuerza Studio

Projeto referente ao teste técnico solicitado pela Fuerza Studio. Em resumo, este projeto trata de um CRUD de uma entidade denominada Post (title, body, tags). Além disso, foram incluídas rotas de autenticação, permitindo a criação e o login de usuários. Dessa forma, as rotas de gerenciamento de Posts só serão acessíveis por usuários autenticados.

## 🚀 Começando

Clone o repositório para sua máquina local.

```
https://github.com/hitaloose/nodejs-backend-challenge.git
```

### 📋 Pré-requisitos

Para executar o projeto, é fundamental ter o Node instalado. Além disso, caso deseje utilizar uma implementação de banco de dados, é necessário ter o PostgreSQL instalado.

### 🔧 Instalação

Segue o passo-a-passo para a instalação e execução do projeto.

Primeiro, é necessário configurar as variáveis de ambiente. Isso pode ser feito copiando as variáveis de exemplo.

```
cp .env.exemple .env
```

> [!NOTE]
> A variável REPO_IMPL aceita dois valores ("in_memory", "typeorm"). Ao utilizar a opção "typeorm", é obrigatório informar os dados de acesso ao PostgreSQL.

Agora, é necessário instalar as dependências externas utilizando o comando abaixo.

```
npm install
```

Para executar o projeto em modo de desenvolvimento, onde o servidor será reiniciado a cada alteração de arquivo, execute o comando abaixo.

```
npm run dev
```

Para executar o projeto sem a camada de desenvolvimento, basta executar o comando abaixo, pois ele já realizará o build do código e iniciará o serviço.

```
npm run start
```

Após isso, o projeto estará pronto para receber requisições. Consulte a documentação para obter mais detalhes sobre as rotas aceitas.

## ⚙️ Executando os testes

Após executar os comandos mencionados na seção de Instalação, basta rodar o comando abaixo para executar todos os testes automatizados do projeto.

```
npm run test:ci
```

## 📄 Acessando documentação

Para acessar a documentação, é necessário executar os comandos mencionados na seção de Instalação e, com o projeto em execução, acessar a rota `<BASE_URL>/api-docs`.

## 🛠️ Construído com

Segue descrição de algumas das principais ferramentas utilizadas no projeto.

* Typescript - Extensão do JavaScript que adiciona tipos estáticos opcionais para desenvolvimento mais seguro e escalável.
* Express - Framework minimalista para lidar com requisições HTTP.
* Yup - Validador de esquema usado para validar dados nas requisições de usuários.
* Bcrypt - Hasher usado principalmente para criptografar senhas de forma segura.
* JWT - Utilizado para criar token de acesso a API.
* TypeORM - Usado para criar conexão com o banco de dados e gerenciar dados de forma amigável.
* PostgreSQL - Banco de dados relacional utilizado no projeto.
* Jest - Framework para execução de testes automatizados.
* Swagger - Ferramenta para documentar e testar APIs de maneira fácil e interativa.
