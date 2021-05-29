FROM node:14-alpine

WORKDIR /app

COPY src ./src
COPY public ./public
COPY tsconfig.json .
COPY package*.json ./

RUN npm install && npm run build

CMD ["npm", "start"]
