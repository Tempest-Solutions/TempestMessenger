FROM node

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./node_modules ./

RUN npm install
RUN npm update

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]