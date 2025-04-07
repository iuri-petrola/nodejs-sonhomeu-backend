import prismaClient from "../../prisma";

interface ItemRequest{
  cart_id: string;
  product_id: string;
}

class AddCartItemService{
  async execute({ cart_id, product_id }: ItemRequest){

    const cart = await prismaClient.cartItem.create({
      data:{
        cartId: cart_id,
        productId: product_id
      }
    })

    return cart;

  }
}

export { AddCartItemService }