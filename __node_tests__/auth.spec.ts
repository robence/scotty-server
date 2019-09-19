import * as request from 'supertest';
import { Application } from 'express';
import { Logger } from '@overnightjs/logger';
import { OK } from 'http-status-codes';
import UserModel, { UserTypePassword } from '../src/features/user/Model';
import App from '../src/app';
import { disconnect, start } from '../src/database';

let app: Application;

const newUser: UserTypePassword = {
  email: 'user@email.com',
  username: 'username',
  accounts: [],
  tags: [],
  password: '1234',
};

describe('Auth', (): void => {
  beforeEach((done): void => {
    UserModel.deleteMany({}).then((): void => done());
  });

  beforeAll(
    async (done): Promise<void> => {
      try {
        await start(process.env.MONGO_URL);
        Logger.Imp('Connected to MongoDB.');
        app = new App().getApp();
        Logger.Imp('Application Started.');
        Logger.Imp('Running tests now.');
        done();
      } catch (e) {
        Logger.Err('Cannot connect to MongoDB.');
      }
    },
  );

  afterAll(
    async (done): Promise<void> => {
      Logger.Imp('Finished tests.');
      await disconnect();
      done();
    },
  );

  describe('POST /api/auth/login', (): void => {
    /* eslint-disable-next-line */
    xit('should login user and send token back', async (done): Promise<void> => {
      await UserModel.insertMany([newUser]);
      const { username, password } = newUser;

      request(app)
        .post('/api/auth/login')
        .send({
          username,
          password,
        })
        .set('Accept', 'application/json')
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toHaveProperty('token');
            done();
          },
        );
    });
  });
});
