import prismaClient from "../../prisma";

class ListProductService{
  async execute(){
    
    const ListProductService = await prismaClient.product.findMany({
    })

    return ListProductService;

  }
}

export { ListProductService }