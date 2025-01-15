# Task Manager

## Instruções de Instalação e Configuração

Este documento fornece todas as instruções necessárias para configurar e executar o projeto localmente.

### Pré-requisitos

1. **Node.js**:
   - Certifique-se de que o Node.js está instalado na sua máquina (recomendado: versão `>=18`). Caso não tenha o Node.js instalado, [baixe aqui](https://nodejs.org/).

2. **Git**:
   - Certifique-se de que o Git está instalado. Caso não esteja, [baixe aqui](https://git-scm.com/).

### Passos para Configuração

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/RodrigoSerrasqueiro/task-manager.git
   cd task-manager
   ```

2. **Instalar Dependências**
   - Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente**
   - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`. O `.env.example` contém os nomes das variáveis de ambiente necessárias. Certifique-se de preencher as variáveis corretamente para o funcionamento do projeto.

     **Exemplo:**
     ```
     VITE_API_BASE_URL=https://api.example.com
     ```

4. **Executar o Projeto**
   - Para iniciar o projeto em ambiente de desenvolvimento, execute o comando abaixo:
   ```bash
   npm run dev
   ```

   O projeto estará acessível no endereço [http://localhost:5173](http://localhost:5173) (ou na porta configurada).

### Recursos Adicionais

- **Scripts Disponíveis:**
  - `npm run dev`: Inicia o servidor de desenvolvimento.
  - `npm run preview`: Pré-visualiza o build em um servidor local.

### Suporte
Se encontrar algum problema, sinta-se à vontade para abrir uma **issue** no repositório ou entre em contato diretamente com o mantenedor do projeto.
