FROM node:lts-alpine3.16
WORKDIR /app
COPY . /app

RUN npm install --quiet

EXPOSE 3500

CMD ["npm", "run", "dev"]
