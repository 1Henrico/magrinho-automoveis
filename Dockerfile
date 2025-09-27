FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema necessário para algumas dependências npm
RUN apk add --no-cache libc6-compat git

# Copiar arquivos de package primeiro para aproveitar cache de camadas
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci --silent || npm install --silent

# Copiar o restante do projeto
COPY . .

ENV PORT=5173

EXPOSE 5173

# Comando de desenvolvimento: forçar host para 0.0.0.0 para ser acessível fora do container
CMD ["sh", "-lc", "npm run dev -- --host 0.0.0.0 --port $PORT"]
