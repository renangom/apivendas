import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";


interface IRequest{
  id:string,
  name: string,
  email: string
}


class UpdateCustomerService{
  public async execute({id, name, email}:IRequest):Promise<Customer>{
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer not found');
    }

    const customerEmail = await customerRepository.findByEmail(email);

    if(customer && customerEmail?.email !== email){
      throw new AppError('There is already one customer using this email')
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
