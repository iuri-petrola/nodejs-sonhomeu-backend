import { Request, Response } from 'express';
import { CartService } from '../../services/cart/cartService';
import prismaClient from '../../prisma';

export class CartController {

  async addItem(req: Request, res: Response) {

    try {
      const cartService = new CartService();
      const { productId, userId } = req.body;
      //const { productId } = req.body;
      //const userId = req.user?.id;

      console.log("Corpo recebido:", req.body); // Debug

      if (!userId) {
        return res.status(400).json({ 
          error: 'UserId não fornecido',
          received: req.body
        });
      }      

      if (!userId || !productId) {
        return res.status(400).json({ 
          error: 'userId and productId are required',
          received: { productId, userId } // Retorna o que foi recebido
         });
      }

      const cartItem = await cartService.addToCart(userId, productId);
      return res.json(cartItem);

    } catch (error) {
      console.error('[CART_CONTROLLER_ERROR]', error);
      return res.status(500).json({ error: 'Erro ao adicionar item no carrinho' });
    }
  }

  async getItems(req: Request, res: Response) {
    try {
      const cartService = new CartService();
      const userId = req.user?.id; // Assumindo que o middleware isAuthenticated adiciona o usuário
      //const { userId } = req.body; // Em vez de req.user.id

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const items = await cartService.getCartItems(userId);
      return res.json(items);
      
    } catch (error) {
      console.error('[CART_CONTROLLER_ERROR]', error);
      return res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
  }

  async getCart(req: Request, res: Response) {
    //console.log("User ID:", req.user?.userId); // Debug
    try {
      const cartService = new CartService();
      const userId = req.user?.id; // Do middleware isAuthenticated
      //const userId  = req.body; // Em vez de req.user.id

      if (!userId) {
        return res.status(400).json({ error: 'ID do usuário não encontrado' });
      }

      // Método seguro que cria o carrinho se não existir
      //const cart = await cartService.getOrCreateCart(userId);

      //if (!cart) {
      //  return res.status(404).json({ error: 'Carrinho não encontrado' });
      //}

      const items = await cartService.getUserCartItems(userId);
      return res.json(items);

      
      // Garante que items sempre será um array
      //const items = cart.items || [];
      //return res.json(items);

      //const cart = await cartService.getCartWithItems(userId);
      //return res.json(cart.items);
    } catch (error) {
      console.error('[CART_CONTROLLER_ERROR]', error);
      return res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
  }

  async closeCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
  
  
      // Fecha TODOS os carrinhos abertos do usuário
      await prismaClient.cart.updateMany({
        where: { userId, open: true },
        data: { open: false },
      });
  
      return res.status(200).json({ message: 'Carrinho finalizado' });
    } catch (error) {
      console.error('[CLOSE_CART_ERROR]', error);
      return res.status(500).json({ error: 'Erro ao finalizar carrinho' });
    }
  }

}