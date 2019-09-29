import * as request from 'supertest';
import { Application } from 'express';
import { Logger } from '@overnightjs/logger';
import { OK, NOT_FOUND, BAD_REQUEST, getStatusText } from 'http-status-codes';
import UserModel, {
  UserType,
  UserTypePassword,
} from '../src/features/user/Model';
import App from '../src/app';
import { disconnect, start } from '../src/database';

let app: Application;

const userURL = `/api/users`;

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
    /* eslint-disable-next-line */
    xit('Should create a user', async (done): Promise<void> => {
      const newUser: UserTypePassword = {
        email: 'user1@email.com',
        username: 'user1',
        accounts: [],
        tags: [],
        password: '1234',
      };

      request(app)
        .post(userURL)
        .send(newUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(({ body }): void => {
          expect(body).toHaveProperty('user');
          const { username, email, accounts, tags } = body.user;
          const actual: UserType = { username, email, accounts, tags };
          expect(actual.accounts).toEqual(newUser.accounts);
          expect(actual.tags).toEqual(newUser.tags);
          expect(actual.username).toEqual(newUser.username);
          expect(actual.email).toEqual(newUser.email);
          done();
        });
    });

    it('Should expect Validation Error', async (done): Promise<void> => {
      const newUser: UserTypePassword = {
        email: 'user2@email.com',
        username: 'user2',
        accounts: [],
        tags: [],
        password: '1234',
      };

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

  // TODO: this is a protected route

  // describe(`POST ${userURL}/tag`, (): void => {
  //   it('Should add tag to user', async (done): Promise<void> => {
  //     const newUser: UserTypePassword = {
  //       email: 'user3@email.com',
  //       username: 'user3',
  //       accounts: [],
  //       tags: [],
  //       password: '1234',
  //     };

  //     const user = new UserModel(newUser);
  //     const { _id } = await user.save();

  //     request(app)
  //       .post(`${userURL}/tag`)
  //       .send({ name: 'First Tag', userId: _id })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(OK)
  //       .then(
  //         async ({ body }): Promise<void> => {
  //           expect(body).toHaveProperty('tag');
  //           expect(body).toHaveProperty('tag._id');
  //           expect(body.tag.name).toBe('First Tag');

  //           const updatedUser = await UserModel.findById(_id);
  //           expect(updatedUser).toHaveProperty('tags');
  //           expect(updatedUser.tags).not.toHaveLength(0);
  //           expect(updatedUser.tags[0].name).toBe('First Tag');
  //           done();
  //         },
  //       );
  //   });
  // });

  // TODO: this is a protected route

  // describe(`POST ${userURL}/account`, (): void => {
  //   it('Should add account to user', async (done): Promise<void> => {
  //     const newUser: UserTypePassword = {
  //       email: 'user4@email.com',
  //       username: 'user4',
  //       accounts: [],
  //       tags: [],
  //       password: '1234',
  //     };

  //     const user = new UserModel(newUser);
  //     const { _id } = await user.save();

  //     request(app)
  //       .post(`${userURL}/account`)
  //       .send({ name: 'First Account', userId: _id })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(OK)
  //       .then(
  //         async ({ body }): Promise<void> => {
  //           expect(body).toHaveProperty('account');
  //           expect(body).toHaveProperty('account._id');
  //           expect(body.account.name).toBe('First Account');

  //           const updatedUser = await UserModel.findById(_id);
  //           expect(updatedUser).toHaveProperty('accounts');
  //           expect(updatedUser.accounts).not.toHaveLength(0);
  //           expect(updatedUser.accounts[0].name).toBe('First Account');
  //           done();
  //         },
  //       );
  //   });
  // });

  describe(`GET ${userURL}`, (): void => {
    it('Should retrieve all users', async (done): Promise<void> => {
      const newUser: UserTypePassword = {
        email: 'user5@email.com',
        username: 'user5',
        accounts: [],
        tags: [],
        password: '1234',
      };

      await UserModel.insertMany([newUser]);

      request(app)
        .get(userURL)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            // check response
            expect(body).toHaveProperty('users');
            expect(body.users).toHaveLength(1);

            // check database
            const users = await UserModel.find({});
            expect(users).toHaveLength(1);

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
      const newUser: UserTypePassword = {
        email: 'user6@email.com',
        username: 'user6',
        accounts: [],
        tags: [],
        password: '1234',
      };

      const [res] = await UserModel.insertMany([newUser]);

      request(app)
        .get(`${userURL}/id/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            expect(body).toHaveProperty('user');
            expect(body).not.toHaveProperty('user.password');
            const user = await UserModel.findById(res._id);

            const { email, accounts, username, tags } = body.user;

            expect(email).toBe(newUser.email);
            expect(username).toBe(newUser.username);
            expect(accounts).toHaveLength(newUser.accounts.length);
            expect(tags).toHaveLength(newUser.tags.length);

            expect(user.email).toBe(email);
            expect(user.username).toBe(username);
            expect(user.accounts).toHaveLength(accounts.length);
            expect(user.tags).toHaveLength(tags.length);
            done();
          },
        );
    });

    it(`Should expect ${getStatusText(BAD_REQUEST)}`, async (done): Promise<
      void
    > => {
      const newUser: UserTypePassword = {
        email: 'user7@email.com',
        username: 'user7',
        accounts: [],
        tags: [],
        password: '1234',
      };

      const [res] = await UserModel.insertMany([newUser]);
      await UserModel.findByIdAndRemove(res._id);

      request(app)
        .get(`${userURL}/id/${res._id}`)
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

  // TODO: this is a protected route

  // describe(`DELETE ${userURL}:id`, (): void => {
  //   it('Should delete a user', async (done): Promise<void> => {
  //     const newUser: UserTypePassword = {
  //       email: 'user8@email.com',
  //       username: 'user8',
  //       accounts: [],
  //       tags: [],
  //       password: '1234',
  //     };

  //     const user = new UserModel(newUser);
  //     const { _id } = await user.save();

  //     request(app)
  //       .delete(`${userURL}/${_id}`)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(OK)
  //       .then(
  //         async ({ body }): Promise<void> => {
  //           expect(body).toBe(_id.toString());
  //           const deletedUser = await UserModel.findById(body);
  //           expect(deletedUser).toBe(null);
  //           done();
  //         },
  //       );
  //   });

  // });
});
