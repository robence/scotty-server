import * as request from 'supertest';
import { expect } from 'chai';

import App from '../src/app-overnight';

describe('overnight test', () => {
  describe('GET /api/test-two', () => {
    it('waits a seconds', function(done) {
      async function x(): Promise<number> {
        return 42;
      }

      x().then(function(returnValue) {
        expect(returnValue).to.equal(42);
        done();
      });
    });

    it('should retrieve msg', function(done) {
      const expected = {
        msg: 'get_all_called',
      };

      return request('http://localhost:5000')
        .get('/api/test-two')
        .set('Accept', 'application/json')
        .then(function(resp) {
          expect(resp.body.msg).to.exist;
          expect(resp.body.msg).to.equal(expected.msg);
          done();
        });
    });
  });
});
