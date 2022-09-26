import productsRoutes from "@modules/products/infra/http/routes/products.routes";
import { Request, Response, Router } from "express";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";
import sessionRouter from "@modules/users/infra/http/routes/session.routes";
import forgotPasswordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import customerRouter from "@modules/customers/infra/http/routes/customers.routes";
import ordersRoutes from "@modules/orders/infra/http/routes/orders.routes";
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
