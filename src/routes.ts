import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'

import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'

import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'

import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'


import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'
import { ListProductController } from './controllers/product/ListProductController';
import { AddCartItemController } from './controllers/cart/AddCartItemController';
import { CartController } from './controllers/cart/cartController';

const router = Router();

const upload = multer(uploadConfig.upload("/mnt/img"));

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated,  new DetailuserController().handle )

//-- ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
router.get('/category', isAuthenticated, new ListCategoryController().handle )

//-- ROTAS PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle )
//router.get('/product', isAuthenticated, new ListProductController().handle )
router.get('/product', new ListProductController().handle )
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle )

//-- ROTAS CARRINHO
router.post('/cart', isAuthenticated, new CartController().addItem )
//router.get('/cart', isAuthenticated, new CartController().getItems);
router.get('/cart', isAuthenticated, new CartController().getCart);
router.patch('/cart/close', isAuthenticated, new CartController().closeCart);
router.get('/cart/pending', isAuthenticated, new CartController().getCartPending);
router.patch('/cart/finish', isAuthenticated, new CartController().finishCart);
//router.post('/cart/add', new AddCartItemController().handle )
router.post('/cart/add', isAuthenticated, new AddCartItemController().handle )


//-- ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle )
router.delete('/order', isAuthenticated, new RemoveOrderController().handle )

router.post('/order/add', isAuthenticated, new AddItemController().handle )
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle )

router.put('/order/send', isAuthenticated, new SendOrderController().handle )

router.get('/orders', isAuthenticated, new ListOrdersController().handle )
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle )

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle )



export { router }; 