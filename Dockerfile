FROM node:14
WORKDIR /home/shashikant/blog-backend/
COPY package*.json ./ 
RUN npm install
COPY . . 
CMD [ "npm" ,"run" ,"dev"]
