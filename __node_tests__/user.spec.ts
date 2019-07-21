// TODO: Add ValidationError (mongo) expetion test cases
// TODO: Add HTTPClientError test cases

import * as request from 'supertest';
import { Application } from 'express';
import { OK, NOT_FOUND } from 'http-status-codes';

import instance from '../src/app';
import { UserType, UserModel } from '../src/features/user/Model';
import { BASE, ID, USER } from '../src/url';
import log from '../src/utils/log';

let app: Application;

const userURL = `/${BASE}${USER}`;

const newUser: UserType = {
  email: 'example@email.com', //
  username: 'johndoe73',
};

const newUser2: UserType = {
  email: 'example2@email.com',
  username: 'janedoe73',
};

const newUsers = [newUser, newUser2];

describe('User', (): void => {
  beforeEach((done): void => {
    UserModel.deleteMany({}).then((): void => done());
  });

  beforeAll(
    async (done): Promise<void> => {
      app = await instance.getApp();
      log.success('Application Started.');
      log.info('Running tests now.');
      done();
    },
  );

  afterAll(
    async (done): Promise<void> => {
      log.info('Finished tests.');

      await instance.disconnect();
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
        .then((response): void => {
          expect(response.body.user).toBeDefined();
          const { username, email } = response.body.user;
          const actual: UserType = { username, email };
          expect(actual).toEqual(newUser);
          done();
        });
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
        .then((response): void => {
          expect(response.body.users).toBeDefined();
          expect(response.body.users.length).toBe(newUsers.length);
          done();
        });
    });
  });

  describe(`GET ${userURL}${ID}`, (): void => {
    it('should retrieve a user', async (done): Promise<void> => {
      const [res] = await UserModel.insertMany([newUser]);

      request(app)
        .get(`${userURL}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.user).toBeDefined();
          const { username, email } = response.body.user;
          const actual: UserType = { username, email };
          expect(actual).toEqual(newUser);
          done();
        });
    });

    it('should expect an 404', async (done): Promise<void> => {
      const [res] = await UserModel.insertMany([newUser]);
      await UserModel.findByIdAndRemove(res._id);

      request(app)
        .get(`${userURL}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(NOT_FOUND)
        .then((response): void => {
          expect(response.body.error).toBeDefined();
          // TODO: Important!!
          // FIXME: add message to error body
          // expect(response.body.error.message).toBe(getStatusText(NOT_FOUND));
          done();
        });
    });
  });

  describe(`PUT ${userURL}${ID}`, (): void => {
    it('should update a user', async (done): Promise<void> => {
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      request(app)
        .put(`${userURL}/${_id}`)
        .send(newUser2)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.user).toBeDefined();
          const { username, email } = response.body.user;
          const actual: UserType = { username, email };
          expect(actual).toEqual(newUser2);
          done();
        });
    });

    it(`Should expect ${NOT_FOUND}`, async (done): Promise<void> => {
      // create user to have a valid id
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      // then delete it, we are expecting 404
      await UserModel.findByIdAndDelete(_id);

      request(app)
        .put(`${userURL}/${_id}`)
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(NOT_FOUND)
        .then((response): void => {
          expect(response.body.error).toBeDefined();
          expect(response.body.error.name).toBe('HTTP404Error');
          expect(response.body.error.statusCode).toBe(NOT_FOUND);
          // expect(response.body.error.message).toBe('user not found');
          done();
        });
    });
  });

  describe(`DELETE ${userURL}${ID}`, (): void => {
    it('should delete a user', async (done): Promise<void> => {
      const user = new UserModel(newUser);
      const { _id } = await user.save();

      request(app)
        .delete(`${userURL}/${_id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.user).toBeDefined();
          const { username, email } = response.body.user;
          const actual: UserType = { username, email };
          expect(actual).toEqual(newUser);
          done();
        });
    });
  });
});
