import * as request from 'supertest';
import { Application } from 'express';
import { Logger } from '@overnightjs/logger';
import { OK } from 'http-status-codes';
import CategoryModel, { CategoryType } from '../src/features/category/Model';
import App from '../src/app';
import { disconnect, start } from '../src/database';

let app: Application;

const categoryURL = `/api/categories`;
const newCategory: CategoryType = { name: 'Food & Health' };
const newCategory2: CategoryType = { name: 'Household' };
const newCategories = [newCategory, newCategory2];

describe('Category', (): void => {
  beforeEach((done): void => {
    CategoryModel.deleteMany({}).then((): void => done());
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

  // TODO: this is a protected route

  // describe(`POST ${categoryURL}`, (): void => {
  //   it('Should create a category', async (done): Promise<void> => {
  //     request(app)
  //       .post(categoryURL)
  //       .send(newCategory)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(OK)
  //       .then(({ body }): void => {
  //         expect(body).toHaveProperty('category');
  //         const { name } = body.category;
  //         const actual: CategoryType = { name };
  //         expect(actual).toEqual(newCategory);
  //         done();
  //       });
  //   });
  // });

  describe(`GET ${categoryURL}`, (): void => {
    it('Should retrieve all categories', async (done): Promise<void> => {
      await CategoryModel.insertMany(newCategories);

      request(app)
        .get(categoryURL)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            // check response
            expect(body).toHaveProperty('categories');
            expect(body.categories).toHaveLength(newCategories.length);

            // check database
            const categories = await CategoryModel.find({});
            expect(categories).toHaveLength(newCategories.length);

            done();
          },
        );
    });

    it('Should return empty array', async (done): Promise<void> => {
      request(app)
        .get(categoryURL)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then(
          async ({ body }): Promise<void> => {
            // check response
            expect(body).toHaveProperty('categories');
            expect(body.categories).toHaveLength(0);

            // check database
            const categories = await CategoryModel.find({});
            expect(categories).toHaveLength(0);

            done();
          },
        );
    });
  });
});
