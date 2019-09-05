import * as request from 'supertest';
import { Application } from 'express';
import { Logger } from '@overnightjs/logger';
import { OK, NOT_FOUND, BAD_REQUEST, getStatusText } from 'http-status-codes';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';

import UserModel, { UserType } from '../src/features/user/Model';
import App from '../src/app';
import { disconnect, start } from '../src/database';
import { format } from '../src/utils/model';

let app: Application;

const userURL = `/api/users`;

const newUser: UserType = {
  email: 'example@email.com', //
  username: 'johndoe73',
  accounts: [],
  tags: [],
};

const newUser2: UserType = {
  email: 'example2@email.com',
  username: 'janedoe73',
  accounts: [],
  tags: [],
};

const newUsers = [newUser, newUser2];

describe('User', (): void => {
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

  describe(`POST ${userURL}`, (): void => {
    it('Should create a user', async (done): Promise<void> => {
      request(app)
        .post(userURL)
        .send(newUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(({ body }): void => {
          expect(body).toHaveProperty('user');
          const { username, email, tags, accounts } = body.user;
          const actual: UserType = { username, email, tags, accounts };
          expect(actual).toEqual(newUser);
          done();
        });
    });

    it('Should expect Validation Error', async (done): Promise<void> => {
      await UserModel.insertMany([newUser]);

      request(app)
        .post(userURL)
        .send(newUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(BAD_REQUEST)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toHaveProperty('error.message');
            expect(body).toHaveProperty('error.name');
            expect(body).toHaveProperty('error.errors.email');
            expect(body).toHaveProperty('error.errors.username');

            // validate database integrity
            const users = await UserModel.find({});
            expect(users).toHaveLength(1);
            done();
          },
        );
    });
  });

  describe(`POST ${userURL}/tag`, (): void => {
    it('Should add tag to user', async (done): Promise<void> => {
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      request(app)
        .post(`${userURL}/tag`)
        .send({ name: 'First Tag', userId: _id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toHaveProperty('user');
            expect(body).toHaveProperty('user.tags');
            expect(body.user.tags).not.toHaveLength(0);
            expect(body.user.tags[0]).toHaveProperty('_id');
            expect(body.user.tags[0].name).toBe('First Tag');

            const updatedUser = await UserModel.findById(_id);
            expect(updatedUser).toHaveProperty('tags');
            expect(updatedUser.tags).not.toHaveLength(0);
            expect(body.user.tags[0]).toHaveProperty('_id');
            expect(body.user.tags[0].name).toBe('First Tag');
            done();
          },
        );
    });
  });

  describe(`POST ${userURL}/account`, (): void => {
    it('Should add account to user', async (done): Promise<void> => {
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      request(app)
        .post(`${userURL}/account`)
        .send({ name: 'First Account', userId: _id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toHaveProperty('user');
            expect(body).toHaveProperty('user.accounts');
            expect(body.user.accounts).not.toHaveLength(0);
            expect(body.user.accounts[0]).toHaveProperty('_id');
            expect(body.user.accounts[0].name).toBe('First Account');

            const updatedUser = await UserModel.findById(_id);
            expect(updatedUser).toHaveProperty('accounts');
            expect(updatedUser.accounts).not.toHaveLength(0);
            expect(body.user.accounts[0]).toHaveProperty('_id');
            expect(body.user.accounts[0].name).toBe('First Account');
            done();
          },
        );
    });
  });

  describe(`GET ${userURL}`, (): void => {
    it('Should retrieve all users', async (done): Promise<void> => {
      await UserModel.insertMany(newUsers);

      request(app)
        .get(userURL)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            // check response
            expect(body).toHaveProperty('users');
            expect(body.users).toHaveLength(newUsers.length);

            // check database
            const users = await UserModel.find({});
            expect(users).toHaveLength(newUsers.length);

            done();
          },
        );
    });

    it('Should return empty array', async (done): Promise<void> => {
      request(app)
        .get(userURL)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            // check response
            expect(body).toHaveProperty('users');
            expect(body.users).toHaveLength(0);

            // check database
            const users = await UserModel.find({});
            expect(users).toHaveLength(0);

            done();
          },
        );
    });
  });

  describe(`GET ${userURL}:id`, (): void => {
    it('Should retrieve a user', async (done): Promise<void> => {
      const [res] = await UserModel.insertMany([newUser]);

      request(app)
        .get(`${userURL}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toHaveProperty('user');
            const user = await UserModel.findById(res._id);

            const { actual, expected } = format(user, body.user);
            expect(expected).toEqual(actual);
            done();
          },
        );
    });

    it(`Should expect ${getStatusText(BAD_REQUEST)}`, async (done): Promise<
      void
    > => {
      const [res] = await UserModel.insertMany([newUser]);
      await UserModel.findByIdAndRemove(res._id);

      request(app)
        .get(`${userURL}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(NOT_FOUND)
        .then(({ body }): void => {
          expect(body).toHaveProperty('error');
          expect(body.error.name).toBe('HTTPNotFound');
          expect(body.error.statusCode).toBe(NOT_FOUND);
          expect(body.error.message).toBe('user not found');
          done();
        });
    });
  });

  describe(`DELETE ${userURL}:id`, (): void => {
    it('Should delete a user', async (done): Promise<void> => {
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      request(app)
        .delete(`${userURL}/${_id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toBe(_id.toString());
            const deletedUser = await UserModel.findById(body);
            expect(deletedUser).toBe(null);
            done();
          },
        );
    });

    it(`Should expect ${getStatusText(NOT_FOUND)}`, async (done): Promise<
      void
    > => {
      // create user to have a valid id
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      // then delete it, we are expecting 404
      await UserModel.findByIdAndDelete(_id);

      request(app)
        .delete(`${userURL}/${_id}`)
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(NOT_FOUND)
        .then(({ body }): void => {
          expect(body).toHaveProperty('error');
          expect(body.error.name).toBe('HTTPNotFound');
          expect(body.error.statusCode).toBe(NOT_FOUND);
          expect(body.error.message).toBe('user not found');
          done();
        });
    });
  });
});
