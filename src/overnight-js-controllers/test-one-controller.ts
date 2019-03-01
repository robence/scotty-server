import { Request, Response, NextFunction } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Middleware,
} from '@overnightjs/core';

@Controller('api/test-one')
export class TestOneController {
  @Get(':id')
  get(req: Request, res: Response): any {
    console.log(req.params.id);
    return res.status(200).json({ msg: 'get_called' });
  }

  @Get()
  // @Middleware(middleware)
  private getAll(req: Request, res: Response): void {
    res.status(200).json({ msg: 'get_all_called' });
  }

  @Post()
  private add(req: Request, res: Response): void {
    res.status(200).json({ msg: 'add_called' });
  }

  @Put('update-user')
  // @Middleware([middleware1, middleware2])
  private update(req: Request, res: Response): void {
    res.status(200).json({ msg: 'update_called' });
  }

  // Next param is optional
  @Delete(':id')
  private delete(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({ msg: 'delete_called' });
  }

  // async/await work normally :)
  @Get('practice/async')
  private async getWithAsync(req: Request, res: Response): Promise<void> {
    let msg;

    try {
      msg = await this.someMethodWhichReturnsAPromise(req);
    } catch (err) {
      msg = err;
    } finally {
      res.status(200).json({ msg: msg });
    }
  }

  private someMethodWhichReturnsAPromise(req) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('2 seconds later');
        resolve(true);
      }, 2000);
    });
  }
}

// let instance = new TestOneController();
// export default instance;
