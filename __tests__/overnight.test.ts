import * as request from 'supertest';
import { expect } from 'chai';

import App from '../src/app-overnight';

describe('overnight test', () => {
  describe('GET /api/test-two', () => {
    // it('should retrieve msg', async (done) => {
    //   const expected = {
    //     msg: 'get_all_called',
    //   };
    //
    //   let app = App.getApp();
    //   return request(app)
    //     .get('/api/test-two')
    //     .set('Accept', 'application/json')
    //     .expect(200, expected, done);
    // });

    it('waits a seconds', function(done) {
      async function x(): Promise<number> {
        return 42;
      }

      x().then(function(returnValue) {
        expect(returnValue).to.equal(42);
        done();
      });
    });
  });
});
