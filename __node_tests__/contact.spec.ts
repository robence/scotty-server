import * as request from 'supertest';
import { expect } from 'chai';

import { app } from '../src/app';
import { IContact } from '../src/entities';
import Contact from '../src/models/Contact';

const newContact: IContact = {
  email: 'example@email.com',
  username: 'johndoe73',
};

describe('Contact', () => {
  beforeEach((done) => {
    Contact.deleteMany({}).then(() => done());
  });

  it('should have answer to universe', function (done) {
    async function x(): Promise<number> {
      return 42;
    }

    x().then((returnValue) => {
      expect(returnValue).to.equal(42);
      done();
    });
  });

  describe('POST /api/contacts', () => {
    it('should create a contact', (done) => {
      request(app)
        .post('/api/contacts/')
        .send(newContact)
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          Contact.findOne({ email: newContact.email }).then((contact) => {
            expect(contact).to.exist;
            expect(contact.username).to.equal(newContact.username);
            done();
          });
        });
    });
  });

  describe('GET /api/contacts', () => {
    it('should work on app', (done) => {
      request(app)
        .get('/api/contacts')
        .expect(200)
        .end(done);
    });

    it('should retrieve all contacts', async (done) => {
      const res = await Contact.insertMany([newContact]);

      request(app)
        .get('/api/contacts')
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

  describe('GET /api/contacts/{id}', () => {
    it('should retrieve a contact', async (done) => {
      const res = await Contact.insertMany([newContact]);

      request(app)
        .get(`/api/contacts/${res[0]._id}`)
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

  describe('PUT /api/contacts/{id}', () => {
    it('should update a contact', async (done) => {
      const updateContact = {
        username: 'janedoeoriginal',
      };

      const res = await Contact.insertMany([newContact]);

      request(app)
        .put(`/api/contacts/${res[0]._id}`)
        .send(updateContact)
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          Contact.findOne({ _id: res[0]._id }).then((contact) => {
            expect(contact).to.exist;
            expect(contact.email).to.equal(newContact.email);
            expect(contact.username).to.equal(updateContact.username);
            done();
          });
        });
    });
  });

  describe('DELETE /api/contacts/{id}', () => {
    it('should delete a contact', async (done) => {
      const res = await Contact.insertMany([newContact]);
      const { _id } = res[0];
      const contact = await Contact.findOne(_id);

      expect(contact).to.exist;
      expect(contact._id).to.exist;

      request(app)
        .delete(`/api/contacts/${_id}`)
        .expect(200)
        .end((err) => {
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
