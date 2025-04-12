import { NextFunction, Request, Response} from 'express'
import { verify } from 'jsonwebtoken'

interface Payload{
  sub: string;
}

// Adicione esta interface para extender o tipo Request do Express
declare module 'express' {
  interface Request {
    user?: {
      id: string;
    };
  }
}


export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){

  // Receber o token
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).json({ error: 'Token não enviado' });
  }

  const [, token] = authToken.split(" ")

  
  try{
    const decoded = verify(token, process.env.JWT_SECRET!) as Payload;

    // Debug: Mostra o token decodificado
    console.log('Token decodificado:', decoded);


    //Validar esse token.
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload;

    // Atribui como req.user.id mantendo seu sistema atual
    req.user = {
      id: decoded.sub // Usa o sub como ID do usuário
    };
    
    return next();

  }catch (error) {
    console.error('Erro na verificação:', error);
    return res.status(401).json({ 
      error: 'Token inválido',
      details: error.message 
    });
  }
}