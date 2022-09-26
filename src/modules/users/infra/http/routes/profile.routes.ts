import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import ProfileController from "../controller/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();


profileRouter.get(
  '/',
  isAuthenticated,
  profileController.show
)

profileRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      old_password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {is: Joi.exist(), then: Joi.required()})
    }
  }),
  profileController.update
)

export default profileRouter;
