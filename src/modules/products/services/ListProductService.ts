import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepositorie";
import RedisCache from "@shared/cache/RedisCache";


class ListProductService {
  public async execute(): Promise<Product[] | null>{
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await  redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if(!products){
      let products = await productsRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    return products;
  }
}

export default ListProductService;
