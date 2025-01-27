### Frontend Desafio de Desenvolvedor Full Stack

#### Descrição
Este é o frontend para o desafio de desenvolvedor full-stack. Ele utiliza **Vue 3**, **Vite**, **TypeScript**, **Cypress**, **Pinia** e **Vuetify** para fornecer uma experiência interativa e moderna no lado do cliente.

---

### Pré-requisitos
Antes de começar, certifique-se de ter o seguinte instalado:
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **API Backend** em execução (é conveniente que a API esteja funcionando, pois isso é necessário para testar os CRUDs e outras interações com o backend)

---

### Configuração do Ambiente

#### 1. Clone o Repositório
```bash
git clone https://github.com/soaresrodrigo/challenge-full-stack-web-developer.git
cd challenge-full-stack-web-developer/frontend
```

#### 2. Instale as Dependências
Use `npm` ou `yarn` para instalar as dependências do projeto:
```bash
npm ci
# ou
yarn install
```

#### 3. Configure as Variáveis de Ambiente
Copie o arquivo `.env.example` para um novo arquivo `.env`:
```bash
cp .env.example .env
```
Edite o arquivo `.env` para incluir as URLs da sua **API** e outras configurações necessárias:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_URL=http://localhost:5173
```

---

### Executando o Projeto

Antes de iniciar, verifique o README da **API** no caminho `../api/README.MD` para garantir que o ambiente da API esteja configurado corretamente e em execução.

Para iniciar o servidor de desenvolvimento (com recarregamento automático ao fazer alterações), use:
```bash
npm run dev
# ou
yarn dev
```
Lembre-se de que a **API** precisa estar em execução para realizar operações CRUD e interagir corretamente com o backend.

Agora você pode acessar o projeto no seu navegador através do seguinte link e navegar pelo menu superior:
```
http://localhost:5173
```
---

### Testes de Unidade

- **Testes de Unidade**:
  ```bash
  npm run test:unit:dev
  # ou
  yarn test:unit:dev
  ```

---

### Tecnologias Utilizadas
- **Vue 3**
- **Vite**
- **Pinia** (State Management)
- **Vuetify** (UI Framework)
- **Axios** (Requisições HTTP)
- **Cypress** (Testes E2E e Componentes)
- **TypeScript**
