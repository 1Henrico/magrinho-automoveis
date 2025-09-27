# Rodando o projeto localmente (guia rápido)

Existem duas formas fáceis de rodar este projeto sem configurar dependências globais manualmente:

1) Usando Docker (recomendado se você não quer instalar Node):

 - Pré-requisitos: Docker Desktop instalado e rodando.

 - Comandos:

```powershell
cd 'C:\Users\Henrico\Desktop\crimson-showcase-hub-main'
docker compose up --build
```

A aplicação ficará disponível em: http://localhost:5173

Para derrubar o ambiente:

```powershell
docker compose down
```

2) Instalando Node.js localmente (recomendado para desenvolvimento):

 - Pré-requisitos: Node.js LTS instalado (https://nodejs.org/) ou nvm-windows.

 - Comandos:

```powershell
cd 'C:\Users\Henrico\Desktop\crimson-showcase-hub-main'
npm install
npm run dev
```

Observações:
 - Se quiser que o servidor seja acessível pela rede, rode: npm run dev -- --host
 - Se tiver problemas com permissões ou cache, remova `node_modules` e `package-lock.json` e rode `npm ci`.
