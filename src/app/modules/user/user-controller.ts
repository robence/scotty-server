import User from "./user-model";

import { Request, Response } from "express";

class UserController {

  get(req: Request, res: Response) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  update(req: Request, res: Response) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
        }
        user.save(function(err) {
          if (err) {
            res.json(err);
          }
          res.json(user);
        });
      }
    );
  }

  delete(req: Request, res: Response) {
    User.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json(req.params.id);
    });
  }
}

const instance = new UserController();
export default instance;
