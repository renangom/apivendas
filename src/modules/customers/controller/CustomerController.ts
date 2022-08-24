import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";



class CustomerController {
  public async create(req:Request, res:Response):Promise<Response>{
    const createCustomer = new CreateCustomerService();

    const {name, email} = req.body;

    const customer = await createCustomer.execute({name, email});

    return res.json(customer);
  }

  public async index(req:Request, res:Response):Promise<Response>{
    const listCustomers = new ListCustomerService();
    const custoers = listCustomers.execute();

    return res.json(custoers);
  }

  public async show(req:Request, res:Response):Promise<Response>{
    const showCustomer = new ShowCustomerService();
    const {id} = req.params;

    const customer = showCustomer.execute(id);


    return res.json(customer);
  }

  public async delete(req:Request, res:Response):Promise<Response>{
    const deleteCustomer = new DeleteCustomerService();
    const {id} = req.params;

    await deleteCustomer.execute(id);

    return res.json('User has been deleted');
  }

  public async update(req:Request, res:Response):Promise<Response>{
    const updateCustomer = new UpdateCustomerService();
    const {name, email} = req.body;
    const {id} = req.params;

    const customer = await updateCustomer.execute({id, name, email});

    return res.json(customer);
  }
}

export default CustomerController
