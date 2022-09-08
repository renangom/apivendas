import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";


class OrdersController{
  public async show(req:Request, res:Response){
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute(req.params.id);

    return res.json(order);
  }

  public async create(req:Request, res:Response){
    const createOrder = new CreateOrderService();

    const {customer_id, products} = req.body;

    const order = await createOrder.execute({
      customer_id,
      products
    })

    return res.json(order);
  }
}

export default OrdersController;
