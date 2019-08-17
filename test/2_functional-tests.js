/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {

  describe('Routing Tests', function() {

    describe('GET /api/convert => conversion object', function() {
      it('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert?')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      
      it('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert?')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.string, 'Invalid Unit');
          done();
        });
      });

      it('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert?')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.string, 'Invalid Number');
          done();
        });
      });  
     
      it('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert?')
        .query({input: '3/7.2/4kz'})
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.string, 'Invalid Number and Unit');
          done();
        });
      });
      
      it('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert?')
        .query({input: 'kg'})
        .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
        });
      }); 
    });
  });
});
