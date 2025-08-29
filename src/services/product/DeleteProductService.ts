import prismaClient from "../../prisma";

interface ProductRequest {
  id: string;
}

class DeleteProductService {
  async execute({ id }: ProductRequest) {
    const product = await prismaClient.product.update({
      where: { id },
      data: { ativo: false },
    });

    return product;
  }
}

export { DeleteProductService };