import * as request from 'supertest';
import { OK, NOT_FOUND, getStatusText } from 'http-status-codes';

import instance from '../src/app';
import { ContactType, ContactModel } from '../src/features/contact/Model';

const app = instance.getApp();

const baseUrl = '/api';
const contactUrl = `${baseUrl}/contacts`;

const newContact: ContactType = {
  email: 'example@email.com', //
  username: 'johndoe73',
};

const newContact2: ContactType = {
  email: 'example2@email.com',
  username: 'janedoe73',
};

describe('Contact', (): void => {
  beforeEach((done): void => {
    ContactModel.deleteMany({}).then((): void => done());
  });

  beforeAll((done): void => {
    done();
  });

  afterAll((done): void => {
    instance.disconnect().then((): void => {
      done();
    });
  });

  describe(`POST ${contactUrl}`, (): void => {
    it('Should create a contact', async (done): Promise<void> => {
      request(app)
        .post(contactUrl)
        .send(newContact)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.contact).toBeDefined();
          expect(response.body.contact.username).toBe(newContact.username);
          expect(response.body.contact.email).toBe(newContact.email);
          done();
        });
    });
  });

  describe(`GET ${contactUrl}`, (): void => {
    it('Should retrieve all contacts', async (done): Promise<void> => {
      await ContactModel.insertMany([newContact, newContact2]);

      request(app)
        .get(contactUrl)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.contacts).toBeTruthy();
          expect(response.body.contacts.length).toEqual(2);
          done();
        });
    });
  });

  describe(`GET ${contactUrl}/{id}`, (): void => {
    it('should retrieve a contact', async (done): Promise<void> => {
      const [res] = await ContactModel.insertMany([newContact]);

      request(app)
        /* eslint-disable-next-line */
        .get(`${contactUrl}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.contact).toBeTruthy();
          expect(response.body.contact.username).toBe(newContact.username);
          done();
        });
    });

    it('should expect an 404', async (done): Promise<void> => {
      const [res] = await ContactModel.insertMany([newContact]);
      /* eslint-disable-next-line no-underscore-dangle */
      await ContactModel.findByIdAndRemove(res._id);

      request(app)
        /* eslint-disable-next-line no-underscore-dangle */
        .get(`${contactUrl}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(NOT_FOUND)
        .then((response): void => {
          expect(response.body.error).toBe(getStatusText(NOT_FOUND));
          done();
        });
    });
  });

  describe(`PUT ${baseUrl}/{id}`, (): void => {
    it('should update a contact', async (done): Promise<void> => {
      const updateContact = {
        username: 'janedoeoriginal',
      };

      const contact = new ContactModel(newContact);
      const { _id } = await contact.save();

      // const [res] = await ContactModel.save([newContact]);
      // const { _id } = res;

      request(app)
        .put(`${contactUrl}/${_id}`)
        .send(updateContact)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.contact).toBeTruthy();
          expect(response.body.contact.username).toBe(updateContact.username);
          done();
        });
    });
  });

  describe(`DELETE ${contactUrl}/{id}`, (): void => {
    it('should delete a contact', async (done): Promise<void> => {
      const contact = new ContactModel(newContact);
      const { _id } = await contact.save();

      request(app)
        /* eslint-disable-next-line */
        .delete(`${contactUrl}/${_id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(OK)
        .then((response): void => {
          expect(response.body.contact).toBeTruthy();
          expect(response.body.contact.username).toBe(newContact.username);
          done();
        });
    });
  });
});
