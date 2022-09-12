import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";


interface IPaginateCustomer{
  from:number,
  to: number,
  per_page: number,
  total: number,
  current_page: number,
  prev_page: number | null,
  next_page: number | null,
  data: Customer[]
}

class ListCustomerService{
  public async execute():Promise<IPaginateCustomer>{
    const customerRepository = getCustomRepository(CustomersRepository)

    //FAZENDO PAGINAÇÃO DE CUSTOMERS
    const customers = await customerRepository.createQueryBuilder().paginate()

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
