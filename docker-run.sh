# docker build e push image
    docker build --push -t iuripetrola/nodejs-smk:latest .

# Criar rede
#    docker network create --subnet=10.0.0.0/24 --gateway 10.0.0.1 net_nodejs_smk && \

# Iniciar container BD
#    docker run -itd --name postgresql16 -h postgresql16  --net net_nodejs_smk --restart unless-stopped  -p 5432:5432  -v postgresql16:/etc/postgresql/16/main iuripetrola/postgresql:v16 && \

# Iniciar container App
    docker run -itd --name nodejs_smk -h nodejs_smk --net net_nodejs_smk --restart unless-stopped  -p 80:80 --mount type=bind,source=/home/iuri/iuri.petrola@gmail.com-OneDrive/Sistema-Sonho-Meu-Kids/Nodejs-Sonho-meu-kids/,target=/app iuripetrola/nodejs-smk:latest


