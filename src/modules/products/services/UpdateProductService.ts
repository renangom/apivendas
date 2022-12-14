import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepositorie";

interface IRequest{
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({id, name, price, quantity}:IRequest):Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if(!product){
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);
    if(productExists && name !== product.name ){
      throw new AppError('Product already exists');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    product.name = name;
    product.price = price;
    product.quantity = quantity;



    await productsRepository.save(product)
    return product;
  }
}

export default UpdateProductService;
