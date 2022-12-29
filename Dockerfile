FROM node:14
WORKDIR /home/shashikant/blog-backend/
COPY . .
CMD npm install 
RUN [ "npm run dev"]
