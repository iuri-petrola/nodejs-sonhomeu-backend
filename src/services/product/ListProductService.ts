import prismaClient from "../../prisma";

class ListProductService{
  async execute(){
    
    const ListProductService = await prismaClient.product.findMany({
      include: { category: true }
    })

    return ListProductService;

  }
}

export { ListProductService }