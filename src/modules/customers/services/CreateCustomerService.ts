import AppError from "@shared/errors/AppError";
import { Response } from "express"
import Customer from "../typeorm/entities/Customer"
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository"


interface IRquest{
  name:string,
  email:string
}


class CreateCustomerService{
  public async execute({name, email}:IRquest):Promise<Customer>{
    const customerRepository = new CustomerRepository();

    const emailExists = await customerRepository.findByEmail(email);

    if(emailExists){
      throw new AppError('This email is already used');
    }

    const customer = await customerRepository.create({
      name,
      email
    })

    await customerRepository.save(customer)


    return customer
  }
}

export default CreateCustomerService;
