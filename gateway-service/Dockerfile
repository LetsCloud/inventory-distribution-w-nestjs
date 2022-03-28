FROM node:16-alpine

RUN npm install -g npm@8.5.5

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]