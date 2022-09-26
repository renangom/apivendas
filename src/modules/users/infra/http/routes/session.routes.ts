import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import SessionController from "../controller/SessionController";

const sessionRouter = Router();
const sessionController = new SessionController;

sessionRouter.post('/', celebrate({
  [Segments.BODY]:{
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), sessionController.createSession)

export default sessionRouter;
