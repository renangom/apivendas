import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";





class ShowCustomerService{
  public async execute(id:string): Promise<Customer>{
    const customerRepository = new CustomerRepository();

    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer not found');
    }


    return customer;
  }
}

export default ShowCustomerService;
