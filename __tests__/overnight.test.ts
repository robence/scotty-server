import * as request from 'supertest';
import { expect } from 'chai';

import App from '../src/app-overnight';

describe('overnight test', () => {
  it('should have answer to universe', function(done) {
    async function x(): Promise<number> {
      return 42;
    }

    x().then((returnValue) => {
      expect(returnValue).to.equal(42);
      done();
    });
  });

  describe('GET /api/test-two', () => {
    it('should retrieve msg', (done) => {
      const expected = {
        msg: 'get_all_called',
      };

      return request('http://localhost:5000')
        .get('/api/test-two')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });
  });

  describe('GET /api/test-one', () => {
    it('should retrieve msg', (done) => {
      const expected = {
        msg: 'get_called',
      };

      return request('http://localhost:5000')
        .get('/api/test-one/1')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });

    it('should retrieve all msg', (done) => {
      const expected = {
        msg: 'get_all_called',
      };

      return request('http://localhost:5000')
        .get('/api/test-one')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });

    it('should add user', (done) => {
      const expected = {
        msg: 'add_called',
      };

      return request('http://localhost:5000')
        .post('/api/test-one')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });

    it('should update user', (done) => {
      const expected = {
        msg: 'update_called',
      };

      return request('http://localhost:5000')
        .put('/api/test-one/update-user')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });

    it('should delete user', (done) => {
      const expected = {
        msg: 'delete_called',
      };

      return request('http://localhost:5000')
        .delete('/api/test-one/1')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });

    it('should practise async', (done) => {
      const expected = {
        msg: 'async',
      };

      return request('http://localhost:5000')
        .get('/api/test-one/practice/async')
        .set('Accept', 'application/json')
        .then((resp) => {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });
  });
});
