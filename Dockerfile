FROM node:18.12.1

RUN mkdir -p /app && chown -R node:node /app

USER node
WORKDIR /app

COPY --chown=node:node ["package.json", "package-lock.json", "./"]
RUN npm i --production

COPY --chown=node:node . ./
RUN npm run build

ARG port
ENV PORT ${port}

CMD npm start