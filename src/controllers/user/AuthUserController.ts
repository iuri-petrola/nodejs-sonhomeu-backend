import {Request, Response} from 'express';
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController{
  async handle(req: Request, res: Response){
    const { email, password } = req.body;
    const rawAdminHeader = req.headers['x-admin-login'];
    const isAdminLogin = typeof rawAdminHeader === 'string' && rawAdminHeader.toLowerCase() === 'true';
    
    const authUserService = new AuthUserService();

    console.log('requestAdminOnly:', isAdminLogin);

    try {
      const auth = await authUserService.execute({
        email,
        password,
        requestAdminOnly: isAdminLogin
      })

      return res.json(auth);
    } catch (err: any) {
      console.error('[LOGIN_ERROR]', err);
      return res.status(401).json({ error: err.message || 'Erro ao autenticar' });
    }

  }
}

export { AuthUserController }