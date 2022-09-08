import productsRoutes from "@modules/products/routes/products.routes";
import { Request, Response, Router } from "express";
import usersRoutes from "@modules/users/routes/users.routes";
import sessionRouter from "@modules/users/routes/session.routes";
import forgotPasswordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import customerRouter from "@modules/customers/routes/customers.routes";
import ordersRoutes from "@modules/orders/routes/orders.routes";
const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRouter);
routes.use('/password', forgotPasswordRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customerRouter);
routes.use('/order', ordersRoutes);

routes.get('/',  (req: Request, res: Response) => {
  res.json({message: "Hello Dev"})
})

export default routes;
