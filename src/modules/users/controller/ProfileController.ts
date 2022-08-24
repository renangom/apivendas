import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateUserProfileService from "../services/UpdateUserProfileService";

class ProfileController{
  public async show(req:Request, res: Response):Promise<Response>{
    const {id} = req.user
    const showUser = new ShowProfileService();

    const user = await showUser.execute(id);

    return res.json(user)
  }

  public async update(req:Request, res:Response): Promise<Response>{
    const user_id = req.user.id;
    const {name, email, password, old_password} = req.body;

    const updateProfile = new UpdateUserProfileService();
    const user = await updateProfile.execute({user_id,name, email, password, old_password})

    return res.json(user)
  }
}
