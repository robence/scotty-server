import * as request from 'supertest';
import { expect } from 'chai';

import instance  from '../src/app';
import IContact from '../src/features/Contact/contact-type';
import Contact from '../src/features/Contact/contact-model';

const app = instance.getApp();

const baseUrl = '/api'
const contactUrl = `${baseUrl}/contacts`;

const newContact: IContact = {
  email: 'example@email.com',
  username: 'johndoe73',
};

const newContact2: IContact = {
  email: 'example2@email.com',
  username: 'janedoe73',
}

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

  describe(`POST ${contactUrl}`, () =>
    it('should create a contact', async (done) => {
      request(app)
        .post(contactUrl)
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

  describe(`GET ${contactUrl}`, () => {
    it('Should retrieve all contacts', async (done) => {
      await Contact.insertMany([newContact, newContact2]);
      
      request(app)
        .get(contactUrl)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.contacts).to.exist;
          expect(response.body.contacts.length).to.equal(2);
          done()
        })
    });
  });

  describe(`GET ${contactUrl}/{id}`, () => {
    it('should retrieve a contact', async (done) => {
      const [res] = await Contact.insertMany([newContact]);

      request(app)
        .get(`${contactUrl}/${res._id}`)
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
        .put(`${contactUrl}/${_id}`)
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

  describe(`DELETE ${contactUrl}/{id}`, () => {
    it('should delete a contact', async (done) => {
      const [res] = await Contact.insertMany([newContact]);
      const { _id } = res;

      const contact = await Contact.findOne(_id);

      expect(contact).to.exist;
      expect(contact._id).to.exist;

      request(app)
        .delete(`${contactUrl}/${_id}`)
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
