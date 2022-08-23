import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ForgotPasswordController from "../controller/ForgotPasswordController";
import ResetPasswordController from "../controller/ResetPasswordController";


const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

forgotPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]:{
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordController.create
)

forgotPasswordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]:{
      token: Joi.string().uuid(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  resetPasswordController.create
)

export default forgotPasswordRouter;
