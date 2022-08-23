import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ForgotPasswordController from "../controller/ForgotPasswordController";


const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

forgotPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]:{
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordController.create
)

export default forgotPasswordRouter;
