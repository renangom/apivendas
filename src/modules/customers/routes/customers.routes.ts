import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CustomerController from "../controller/CustomerController";
import Customer from "../typeorm/entities/Customer";



const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/', customerController.index);
customerRouter.get('/:id', customerController.show);
customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }),
  customerController.create
);

customerRouter.delete('/:id', customerController.delete);
customerRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]:{
      name:Joi.string().required(),
      email:Joi.string().required()
    },
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required()
    }
  }),
  customerController.update
)

export default customerRouter;
