import AppError from "@shared/errors/AppError";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";



class DeleteCustomerService{
  public async execute(id:string):Promise<void>{
    const customerRepository = new CustomerRepository();

    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer not found');
    }

    await customerRepository.remove(customer);
  }
}


export default DeleteCustomerService;
