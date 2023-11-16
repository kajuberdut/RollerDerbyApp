FROM node:21

# COPY package*json /app/
COPY package.json package-lock.json /app/
WORKDIR /app

# COPY package.json /app/package.json 
# COPY package-lock.json /app/package-lock.json
# COPY package-lock.json ./
# tried 
# package.json ./app
RUN npm install 

COPY . .
# tried  
# . ./
# . /app 
# .  . 

EXPOSE 3000 

CMD ["npm", "start"]

