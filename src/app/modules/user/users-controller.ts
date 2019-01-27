import User from "./user-model";

import { Request, Response } from "express";

class UsersController {

  get(req: Request, res: Response) {
    User.get((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  }

  create(req: Request, res: Response) {
    let user = new User(req.body);

    user.save(err => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }
}

const instance = new UsersController();
export default instance;
