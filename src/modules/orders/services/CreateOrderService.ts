import { CustomerRepository } from "@modules/customers/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepositorie";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IProduct{
  id:string,
  quantity: number
}
interface IRequest{
  customer_id: string;
  products: IProduct[];
}


class CreateOrderService{
  public async execute({customer_id, products}:IRequest):Promise<Order>{
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id)
    if(!customerExists){
      throw new AppError('Customer not found!')
    }

    const existProduct = await productRepository.findAllByIds(products);
    if(!existProduct.length){
      throw new AppError('Could not find any product with the given ids')
    }

    const existProductIds = existProduct.map((product) => product.id);

    const checkInexistentProduct = products.filter(
      product => !existProductIds.includes(product.id)
    );

    if(checkInexistentProduct.length){
      throw new AppError(`Could not find this product id = ${checkInexistentProduct[0].id}`);
    }

    const quantityAvailable = products.filter((product) => {
      existProduct.filter((p) => {
        p.id === product.id
      })[0].quantity < product.quantity
    });

    if(quantityAvailable.length){
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is no available for ${quantityAvailable[0].id}`)
    }

    const serializedProduct = products.map((product) => {
      return ({
        product_id: product.id,
        quantity: product.quantity,
        price: existProduct.filter(p => p.id === product.id)[0].price
      })
    });

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProduct,
    })

    const {order_products} = order;

    //Atualizando quantidade do produto após a compra
    const updatedProductQuantity = order_products.map(
      product => {
        return ({
          id: product.product_id,
          quantity: existProduct.filter(p => p.id === product.id)[0].quantity - product.quantity,
        })
      }
    )

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
