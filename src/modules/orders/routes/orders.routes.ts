import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import OrdersController from "../controller/OrdersController";

const ordersRoutes = Router();
const orderController = new OrdersController();

ordersRoutes.get('/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required()
    }
  })
,orderController.show);

ordersRoutes.post('/',
  celebrate({
    [Segments.BODY]:{
      customer_id: Joi.string().uuid().required(),
      products: Joi.required()
    }
  }),
  orderController.create
)

export default ordersRoutes;
