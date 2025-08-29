import prismaClient from "../../prisma";

class ListProductService{
  async execute(){
    
    const ListProductService = await prismaClient.product.findMany({
      include: { category: true },
      orderBy: {
        created_at: "desc" // os mais novos primeiro
      }
    })

    return ListProductService;

  }
}

export { ListProductService }