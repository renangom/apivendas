import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../infra/typeorm/entities/Order";
import OrdersRepository from "../infra/typeorm/repositories/OrdersRepository";




class ShowOrderService{
  public async execute(id:string):Promise<Order | undefined>{
    const orderRepository = getCustomRepository(OrdersRepository);

    const order = await orderRepository.findById(id);

    if(!order){
      throw new AppError('Order not found!');
    }

    return order;
  }
}


export default ShowOrderService;
