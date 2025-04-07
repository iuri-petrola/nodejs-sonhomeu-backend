import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'] // Ative logs para debug
  });

export default prismaClient;