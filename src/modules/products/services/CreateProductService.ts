import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepositorie"

//interface para os dados
interface IRequest{
  name:string,
  price: number,
  quantity: number
}


//Todo serviço tem uma única responsabilidade
class CreateProductService {
  public async execute({name, price, quantity}:IRequest):Promise<Product> {

    //Pega o Repositório orm criado
    const productsRepository = getCustomRepository(ProductRepository);

    //instanciando o redis
    const redisCache = new RedisCache();

    //Checa se o produto já existe com um método do repositório
    const productExists = await productsRepository.findByName(name);
    if(productExists){
      throw new AppError('There is already one product with this name');
    }

    //monta o produto
    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    //salva o produto
    await productsRepository.save(product)

    return product;
  }
}

export default CreateProductService
