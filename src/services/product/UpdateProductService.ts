import prismaClient from "../../prisma";

interface ProductRequest {
  id: string;
  name?: string;
  price?: string;
  description?: string;
  category_id?: string;
  banner?: string;
}

class UpdateProductService {
  async execute({ id, name, price, description, category_id, banner }: ProductRequest) {
    const product = await prismaClient.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        category_id,
        banner,
      },
    });

    return product;
  }
}

export { UpdateProductService };