#Imagem padrao ubuntu 22 do repositorio oficial
FROM ubuntu:22.04

# Adicionar Permissao no tmp
RUN chmod 777 /tmp

# instalação de pacotes basicos
RUN apt update && apt install -y vim links net-tools apt-utils unzip telnet openssh-server gnupg wget sudo curl tzdata
#initscripts 

# Instalação do locale pt_BR
RUN apt update &&  apt install -y locales && rm -rf /var/lib/apt/lists/* && localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
ENV LANG pt_BR.utf8


# Configurar Timezone America/Fortaleza
RUN	echo "America/Fortaleza" > /etc/timezone && rm -f  /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

### Configurar Node ###

# Instale o NVM (Gerenciador de versoes do NODE) NODE e NPM com:
ENV NODE_VERSION=20.9.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .

#CMD ["node", "index.js"]
