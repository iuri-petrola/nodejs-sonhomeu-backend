# docker build e push image
   docker build -t iuripetrola/nodejs-someu-back:latest . --push 
    #--build-arg DATABASE_URL="postgresql://user_nodejs_someu:pass_nodejs_someu@postgresql16:5432/db_nodejs_someu?schema=public" 
    #--build-arg JWT_SECRET="fbc878419638a610508320c876597c83"

  
   docker build -t iuripetrola/postgresql-someu:16 -f dockerfile_postgresql16 . --push 

  
# Criar rede
   docker network create --subnet=10.0.0.0/24 --gateway 10.0.0.1 net_someu

# Iniciar container BD
   docker run -itd --name postgresql16 -h postgresql16  --net net_someu --restart unless-stopped  -p 5432:5432  -v postgresql16:/etc/postgresql/16/main iuripetrola/postgresql-someu:16

# Iniciar container App
   docker run -itd --name nodejs-someu-back -h nodejs-someu-back --net net_someu --restart unless-stopped  -p 8080:8080 --env DATABASE_URL="postgresql://user_nodejs_someu:pass_nodejs_someu@postgresql16:5432/db_nodejs_someu?schema=public" --mount type=bind,source=/app/img/,target=/app/img/ iuripetrola/nodejs-someu-back:latest
    
   #--mount type=bind,source=/home/iuri/iuri.petrola@gmail.com-OneDrive/Sistema-Sonho-Meu-Kids/Nodejs-Sonho-meu-kids/,target=/app


