FROM node:18.16.0
WORKDIR /app
COPY package*.json ./
#RUN npm install axios
RUN npm install
COPY . .
#EXPOSE 80
CMD ["npm", "start"]
CMD ["node", "index.js"]