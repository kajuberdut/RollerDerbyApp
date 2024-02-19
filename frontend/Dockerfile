FROM node:21

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm install 

COPY . .

EXPOSE 3000 

CMD ["npm", "start"]
# CMD tail -f /dev/null
# way to debug docker tail read it if it doesnt exist 
# command that does nothing forever useful trick because a docker container. I want it to run and do nothing and poke at it at stick



