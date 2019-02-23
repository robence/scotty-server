import * as request from 'supertest';
import { expect } from 'chai';
import * as mocha from 'mocha';
import Contact from '../src/models/contact-model';
import app from '../src/app';

describe('Contact', () => {
  beforeEach((done) => {
    Contact.deleteMany({}).then(() => done());
  });

  describe('GET /api/contacts', () => {
    it('should retrieve all contacts', async (done) => {
      const newContact = {
        email: 'superman@email.com',
        username: 'clarkkentoriginal',
      };

      const res = await Contact.insertMany(Array(10).fill(newContact));

      request(app)
        .get('/api/contacts/')
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          Contact.find({}).then((contacts) => {
            expect(contacts).to.exist;
            expect(10).to.equal(contacts.length);
            done();
          });
        });
    });
  });

  describe('POST /api/contacts', () => {
    it('should create a contact', (done) => {
      const newContact = {
        email: 'superman@email.com',
        username: 'clarkkentoriginal',
      };

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

  describe('GET /api/contacts/{id}', () => {
    it('should retrieve a contact', async (done) => {
      const newContact = {
        email: 'superman@email.com',
        username: 'clarkkentoriginal',
      };

      const res = await Contact.insertMany([newContact]);

      request(app)
        .get(`/api/contacts/${res._id}`)
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
      const newContact = {
        email: 'superman@email.com',
        username: 'clarkkentoriginal',
      };

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
      const newContact = {
        email: 'superman@email.com',
        username: 'clarkkentoriginal',
      };

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
