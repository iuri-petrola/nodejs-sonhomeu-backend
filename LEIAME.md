
# Criar projeto
npx create-react-app <NOME_DO_PROJETO>


# Substituir no package.json
# de
    "typescript": "^4.5.5"
# por
    "typescript": "^5.2.0",
    "ts-node": "^10.9.2"

# de 
    "dev": "ts-node-dev src/server.ts"
# por 
    "dev": "ts-node-dev src/server.ts",
    "prd": "ts-node src/server.ts"


# de 
    "@prisma/client": "^3.9.2",
# por 
    "@prisma/client": "^3.15.2",

