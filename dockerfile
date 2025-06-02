#Imagem padrao ubuntu 22 do repositorio oficial
FROM ubuntu:24.04
#FROM  node:18.20.7-bookworm


# Adicionar Permissao no tmp
RUN chmod 777 /tmp

# instalação de pacotes basicos
#RUN apt update && apt install -y vim links unzip telnet wget apt-utils net-tools

# Instalação do locale pt_BR
RUN apt update &&  apt install -y locales && rm -rf /var/lib/apt/lists/* && localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
ENV LANG pt_BR.utf8


# Configurar Timezone America/Fortaleza
RUN apt update && apt install tzdata -y 
RUN	echo "America/Fortaleza" > /etc/timezone && rm -f  /etc/localtime && dpkg-reconfigure -f noninteractive tzdata


### Configurar Node ###
# Instala dependências e Node.js 18.20.8 via NodeSource
RUN apt update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs=18.20.8-1nodesource1

# Instale o NVM (Gerenciador de versoes do NODE) NODE e NPM com:
#ENV NODE_VERSION=18.20.8
#RUN apt update && apt install -y curl
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
#ENV NVM_DIR=/root/.nvm
#RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
#RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
#RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
#ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
#RUN node --version
#RUN npm --version

# variaveis de ambiente
#ARG DATABASE_URL
#ENV DATABASE_URL=$DATABASE_URL

#ARG JWT_SECRET
#ENV JWT_SECRET=$JWT_SECRET


WORKDIR /app
COPY package.json ./
RUN npm install
RUN npx prisma generate 
COPY . .
ENTRYPOINT npm run prd