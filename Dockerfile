FROM node:17-alpine3.12 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-engines

COPY . .

RUN npm run build

FROM node:17-alpine3.12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --ignore-engines

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]