import * as request from 'supertest';
import { expect } from 'chai';
import * as mocha from 'mocha';
import Contact from '../src/models/contact-model';
import app from '../src/app';

describe('Contact', () => {
  beforeEach((done) => {
    Contact.deleteMany({}).then(() => done());
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

  describe('GET /api/contacts', () => {
    it('should respond with 200', async () => {
      const result = await request(app)
        .get('/api/contacts')
        .expect(200);
    });
  });
});
