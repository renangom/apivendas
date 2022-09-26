import { Request, Response } from "express";
import CreateProductService from "../../../services/CreateProductService";
import DeleteProductService from "../../../services/DeleteProductService";
import ListProductService from "../../../services/ListProductService";
import ShowProductService from "../../../services/ShowProductService";
import UpdateProductService from "../../../services/UpdateProductService";

export default class ProductsController{
  public async index(req: Request, res: Response) {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return res.json(products)
  }

  public async show(req: Request, res: Response) {
    const {id} = req.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({id});

    return res.json(product)
  }

  public async create(req: Request, res: Response): Promise<Response>{
    const {name, price, quantity} = req.body;
    const createProductService = new CreateProductService();

    const product = await createProductService.execute({name, price, quantity})

    return res.json(product)
  }

  public async update(req:Request, res:Response): Promise<Response>{
    const {name, price,quantity} = req.body;
    const {id} = req.params;

    const updateProduct = new UpdateProductService();
    const productUpdated = await updateProduct.execute({id, name, price,quantity})


    return res.json(productUpdated);
  }

  public async delete(req:Request, res: Response): Promise<Response>{
    const {id} = req.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({id});

    return res.json("Product was deleted");
  }
}
