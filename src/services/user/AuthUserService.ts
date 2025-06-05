
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  password: string;
  requestAdminOnly?: boolean;
}


class AuthUserService{
  async execute({ email, password, requestAdminOnly}: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(!user){
      throw new Error("User/password incorrect")
    }

    if (requestAdminOnly) {
      if (user.role !== 'ADMIN') {
        console.log('[BLOQUEADO] Usuário não é admin');
        console.log('requestAdminOnly:', requestAdminOnly);
        console.log('Usuário encontrado:', user.email, 'Role:', user.role);
        throw new Error('Acesso restrito a administradores');
      } else {
        console.log('[OK] Usuário é ADMIN');
      }
    }


    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("User/password incorrect")
    }


    // Se deu tudo certo vamos gerar o token pro usuario.
    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )


    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
     }
  }
}

export { AuthUserService };