FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Opcional: Remove as dependências de desenvolvimento para deixar a imagem leve
RUN npm prune --production

# O Railway vai injetar a porta automaticamente nesta variável
EXPOSE $PORT

# Roda o código compilado em JavaScript (muito mais rápido e leve)
CMD ["node", "dist/main.js"]