FROM mhart/alpine-node:8.1.3

COPY api/ /api
COPY config/ /config
COPY node_modules/ /node_modules
COPY package.json app.js /

RUN npm install pm2 -g

EXPOSE 10010

CMD ["pm2-docker", "app.js"]
