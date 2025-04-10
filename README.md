# Brechó da Neide

![Logo do Brechó da Neide](public/logo.png)

Bem-vindo ao repositório do **Brechó da Neide**! Este projeto é uma aplicação web desenvolvida com [Vue 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/) e [Vite](https://vitejs.dev/), visando oferecer uma plataforma moderna e eficiente para gerenciamento de um brechó online.

## Visão Geral

O Brechó da Neide permite que usuários naveguem por uma variedade de produtos de segunda mão, adicionem itens ao carrinho e finalizem compras de forma intuitiva e segura.

## Funcionalidades Principais

- **Catálogo de Produtos**: Exibição de produtos disponíveis com imagens, descrições e preços.
- **Carrinho de Compras**: Adição e remoção de produtos do carrinho com atualização dinâmica do total.
- **Finalização de Compra**: Processo simplificado para conclusão de pedidos.

## Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/): Framework progressivo para construção de interfaces de usuário.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.
- [Vite](https://vitejs.dev/): Ferramenta de build e desenvolvimento rápida para projetos modernos.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

## Como Executar o Projeto

1. **Clone este repositório**:

   ```bash
   git clone https://github.com/espinhara/brecho-da-neide.git
   ```

2. **Navegue até o diretório do projeto:**:

   ```bash
   > cd  brecho-da-neide
   ```

3. **Instale as dependências:**:

  ```bash
    > pnpm install
  ```

4. **Inicie o servidor de desenvolvimento:**:

  ```bash
    > pnpm run dev
  ```
  
  O aplicativo estará disponível em <http://localhost:5173>.

## Estrutura do Projeto

  ```php
  brecho-da-neide/
  ├── public/             # Arquivos estáticos
  |── dist/               # Arquivos de build
  ├── src/                # Código-fonte principal
  │   ├── assets/         # Recursos como imagens e estilos
  │   ├── components/     # Componentes Vue reutilizáveis
  │   ├── views/          # Páginas da aplicação
  │   ├── App.vue         # Componente raiz
  │   └── main.ts         # Ponto de entrada da aplicação
  ├── .gitignore          # Arquivos e diretórios ignorados pelo Git
  ├── index.html          # Arquivo HTML principal
  ├── package.json        # Dependências e scripts do projeto
  ├── tsconfig.json       # Configurações do TypeScript
  └── vite.config.ts      # Configurações do Vite
  ```

## Contribuição

> Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga os passos abaixo:

   1. Faça um fork deste repositório.

   2. Crie uma branch para sua feature ou correção `(git checkout -b minha-feature)`.

   3. Commit suas alterações `(git commit -m 'Adiciona nova funcionalidade')`.

   4. Envie para o branch principal `(git push origin minha-feature)`.

   5. Abra um Pull Request.

---

_Este README foi gerado para fornecer uma visão geral clara e concisa do projeto Brechó da Neide. Sinta-se à vontade para ajustá-lo conforme as necessidades específicas do seu projeto._
