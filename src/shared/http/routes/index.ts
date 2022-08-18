import productsRoutes from "@modules/products/routes/products.routes";
import { Request, Response, Router } from "express";
const routes = Router();

routes.use('/products', productsRoutes);

routes.get('/',  (req: Request, res: Response) => {
  res.json({message: "Hello Dev"})
})

export default routes;
