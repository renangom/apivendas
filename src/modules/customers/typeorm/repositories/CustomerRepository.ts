import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>{
  public async findByEmail(email:string):Promise<Customer | undefined>{
    const customer = await this.findOne({
      where: {
        email: email
      }
    })

    return customer;
  }

  public async findById(id:string): Promise<Customer|undefined>{
    const customer = await this.findOne({
      where: {
        id: id
      }
    })

    return customer
  }

  public async findByName(name:string):Promise<Customer|undefined>{
    const customer = await this.findOne({
      where:{
        name: name
      }
    })

    return customer;
  }
}
