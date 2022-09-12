import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { cache } from "joi";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/ProductsRepositorie"

interface IRequest{
  id: string
}
class DeleteProductService {
  public async execute({id}:IRequest):Promise<void>{
    const productsRepository = getCustomRepository(ProductRepository);


    const product = await productsRepository.findOne(id);
    if(!product){
      throw new AppError('Product not found');
    }

    const cacheRedis = new RedisCache();

    await cacheRedis.invalidate('api-vendas-PRODUCT_LIST')

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
