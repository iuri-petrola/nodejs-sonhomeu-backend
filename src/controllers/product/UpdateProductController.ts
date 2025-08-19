import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;

    let banner = undefined;
    if (req.file) {
      banner = req.file.filename;
    }

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({
      id,
      name,
      price,
      description,
      category_id,
      banner,
    });

    return res.json(product);
  }
}

export { UpdateProductController };