import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomerRepository';


class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
