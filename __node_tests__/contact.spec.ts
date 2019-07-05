import * as request from 'supertest';
import { expect } from 'chai';

import instance  from '../src/app';
import IContact from '../src/types';
import Contact from '../src/models/Contact';

const app = instance.getApp();
const baseUrl = '/api/contacts';
const newContact: IContact = {
  email: 'example@email.com',
  username: 'johndoe73',
};

describe('Contact', () => {
  beforeEach((done) => {
    Contact.deleteMany({}).then(() => done());
  });

  beforeAll((done /* call it or remove it*/) => {
    done(); // calling it
  });

  afterAll((done) => { 
    instance.disconnect().then(() => { 
      done();
    });
  });

  it('should have answer to universe', async (done) => {
    async function x(): Promise<number> {
      return 42;
    }

    const returnValue = await x()
    expect(returnValue).to.equal(42);
    done();
  });

  describe(`POST ${baseUrl}`, () =>
    it('should create a contact', async (done) => {
      request(app)
        .post(`${baseUrl}/`)
        .send(newContact)
        .expect(200)
        .end(async (err) => {
          if (err) {
            return done(err);
          }
          const contact = await Contact.findOne({ email: newContact.email })
          expect(contact).to.exist;
          expect(contact.username).to.equal(newContact.username);
          done();

        });
    })
  );

  describe(`GET ${baseUrl}`, () => {
    it('should work on app', (done) => {
      request(app)
        .get(`${baseUrl}`)
        .expect(200)
        .end(done);
    });

    it('should retrieve all contacts', async (done) => {
      const res = await Contact.insertMany([newContact]);

      request(app)
        .get(`${baseUrl}`)
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          Contact.find({}).then((contacts) => {
            expect(contacts).to.exist;
            expect(1).to.equal(contacts.length);
            done();
          });
        });
    });
  });

  describe(`GET ${baseUrl}/{id}`, () => {
    it('should retrieve a contact', async (done) => {
      const [res] = await Contact.insertMany([newContact]);

      request(app)
        .get(`${baseUrl}/${res._id}`)
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          Contact.findOne({ email: newContact.email }).then((contact) => {
            expect(contact).to.exist;
            expect(contact._id).to.exist;
            expect(contact.username).to.equal(newContact.username);
            done();
          });
        });
    });
  });

  describe('PUT ${baseUrl}/{id}', () => {
    it('should update a contact', async (done) => {
      const updateContact = {
        username: 'janedoeoriginal',
      };

      const [res] = await Contact.insertMany([newContact]);
      const { _id } = res;

      request(app)
        .put(`${baseUrl}/${_id}`)
        .send(updateContact)
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          Contact.findOne({ _id }).then((contact) => {
            expect(contact).to.exist;
            expect(contact.email).to.equal(newContact.email);
            expect(contact.username).to.equal(updateContact.username);
            done();
          });
        });
    });
  });

  describe(`DELETE ${baseUrl}/{id}`, () => {
    it('should delete a contact', async (done) => {
      const [res] = await Contact.insertMany([newContact]);
      const { _id } = res;

      const contact = await Contact.findOne(_id);

      expect(contact).to.exist;
      expect(contact._id).to.exist;

      request(app)
        .delete(`${baseUrl}/${_id}`)
        .expect(200)
        .end((err: any) => {
          if (err) {
            return done(err);
          }
          Contact.findOne(_id).then((contactt) => {
            expect(contactt).to.not.exist;
            done();
          });
        });
    });
  });
});
