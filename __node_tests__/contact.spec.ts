import * as request from 'supertest';

import instance from '../src/app';
import { ContactType, ContactModel } from '../src/features/Contact';

const app = instance.getApp();

const baseUrl = '/api';
const contactUrl = `${baseUrl}/contacts`;

const newContact: ContactType = {
  email: 'example@email.com',
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
    // TODO: add test case for existing username
    // TODO: add test case for existing email
    // TODO: add test case for missing username
    // TODO: add test case for missing email
    it('Should create a contact', async (done): Promise<void> => {
      request(app)
        .post(contactUrl)
        .send(newContact)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response): void => {
          expect(response.body.id).not.toBeDefined();
          expect(response.body.username).toBe(newContact.username);
          expect(response.body.email).toBe(newContact.email);
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
        .expect(200)
        .then((response): void => {
          expect(response.body.contacts).toBeTruthy();
          expect(response.body.contacts.length).toEqual(2);
          done();
        });
    });
  });

  describe(`GET ${contactUrl}/{id}`, (): void => {
    // it('should retrieve a contact', async (done): Promise<void> => {
    //   const [res] = await ContactModel.insertMany([newContact]);

    //   request(app)
    //     /* eslint-disable-next-line */
    //     .get(`${contactUrl}/${res._id}`)
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .expect(200)
    //     .then((response): void => {
    //       expect(response.body.contact).toBeTruthy();
    //       expect(response.body.contact.username).toBe(newContact.username);
    //       done();
    //     });
    // });

    it('should throw an error', async (done): Promise<void> => {
      const [res] = await ContactModel.insertMany([newContact]);

      request(app)
        /* eslint-disable-next-line */
        .get(`${contactUrl}/${res._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response): void => {
          // expect(response.body.errorMessage.toJSON()).toBeDefined();
          expect(response.body.error).toBeTruthy();
          expect(response.body.error.name).toBe('ValidationError');
          expect(response.body.error.message).toBe('catch me if you can');

          // expect(response.body.errorMessage.name).toBe('ValidationError');
          // expect(response.body.errorMessage.message).toBeTruthy();
          done();
        });
    });
  });

  // describe('PUT ${baseUrl}/{id}', (): void => {
  //   it('should update a contact', async (done): void => {
  //     const updateContact = {
  //       username: 'janedoeoriginal',
  //     };

  //     const [res] = await ContactModel.insertMany([newContact]);
  //     const { _id } = res;

  //     request(app)
  //       .put(`${contactUrl}/${_id}`)
  //       .send(updateContact)
  //       .expect(200)
  //       .end((err) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         ContactModel.findOne({ _id }).then((contact) => {
  //           expect(contact).to.exist;
  //           expect(contact.email).to.equal(newContact.email);
  //           expect(contact.username).to.equal(updateContact.username);
  //           done();
  //         });
  //       });
  //   });
  // });

  // describe(`DELETE ${contactUrl}/{id}`, (): void => {
  //   it('should delete a contact', async (done): void => {
  //     const [res] = await ContactModel.insertMany([newContact]);
  //     const { _id } = res;

  //     const contact = await ContactModel.findOne(_id);

  //     expect(contact).to.exist;
  //     expect(contact._id).to.exist;

  //     request(app)
  //       .delete(`${contactUrl}/${_id}`)
  //       .expect(200)
  //       .end((err: any) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         ContactModel.findOne(_id).then((contactt) => {
  //           expect(contactt).to.not.exist;
  //           done();
  //         });
  //       });
  //   });
  // });
});
