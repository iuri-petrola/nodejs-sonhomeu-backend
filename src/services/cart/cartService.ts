import prismaClient from '../../prisma';

export class CartService {
  async addToCart(userId: string, productId: string) {
    // 1. Encontra ou cria o carrinho de forma segura
    const cart = await prismaClient.cart.upsert({
      where: { 
        userId: userId // Forma correta de referenciar campos únicos
      },
      create: {
        userId: userId,
      },
      update: {},
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // 2. Verifica se o item já existe no carrinho
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      return await prismaClient.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
        include: { product: true }
      });
    }

    // 3. Adiciona novo item ao carrinho
    return await prismaClient.cartItem.create({
      data: {
        cartId: cart.id,
        productId: productId,
        quantity: 1
      },
      include: { product: true }
    });
  }

  async getCartItems(userId: string) {
    const cart = await prismaClient.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    return cart?.items || [];
  }
  
  async getCartWithItems(userId: string) {
    const cart = await prismaClient.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  
    if (!cart) {
      // Cria um carrinho vazio se não existir
      return await prismaClient.cart.create({
        data: { userId },
        include: { items: { include: { product: true } } }
      });
    }
  }

  async getOrCreateCart(userId: string) {
    // Tenta encontrar ou criar o carrinho
    const cart = await prismaClient.cart.upsert({
      where: { userId },
      create: { 
        userId,
        items: { create: [] } // Cria com array vazio
      },
      update: {},
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    return cart;
  }

  async getUserCartItems(userId: string) {
    const cart = await prismaClient.cart.findFirst({
      where: { 
        userId,
        open: true
      },
      include: { items: { include: { product: true } } }
    });
  
    return cart?.items || [];
  }
}
