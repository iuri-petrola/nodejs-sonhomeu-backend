import {Request, Response} from 'express'
import { ListProductService } from '../../services/product/ListProductService'

class ListProductController{
  async handle(req: Request, res: Response){

    const ListProduct = new ListProductService();

    const products = await ListProduct.execute();

    return res.json(products);

  }
}

export { ListProductController }