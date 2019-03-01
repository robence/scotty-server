import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';

@Controller('api/test-two')
class TestTwoController {
  @Get()
  private getAll(req: Request, res: Response): void {
    res.status(200).json({ msg: 'get_all_called' });
  }
}

let instance = new TestTwoController();
export default instance;
