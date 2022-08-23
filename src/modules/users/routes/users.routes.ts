import { Request, Response, Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controller/UsersController";
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controller/UserAvatarController";

const usersRoutes = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig)

usersRoutes.get("/", usersController.index);

usersRoutes.post("/",
celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string()
  }
}) ,
usersController.create)

usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)


export default usersRoutes
