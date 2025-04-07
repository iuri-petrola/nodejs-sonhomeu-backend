import {Request, Response} from 'express'
import { AddCartItemService } from '../../services/cart/AddCartItemService'

class AddCartItemController{
  async handle(req: Request, res: Response){
    const { cart_id, product_id } = req.body;

    const addCartItem = new AddCartItemService();

    const cart = await addCartItem.execute({
      cart_id,
      product_id      
    })

    return res.json(cart);

  }
}

export { AddCartItemController }