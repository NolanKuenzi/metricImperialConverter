/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/
const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

describe('Unit Tests', function(){
  
  describe('Function convertHandler.getNum(input)', function() {
    it('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), '32');
      done();
    });
    it('Decimal Input', function(done) {
      const input = '45.5gal';
      assert.equal(convertHandler.getNum(input), '45.5');
      done();
    });
    it('Fractional Input', function(done) {
      const input = '750/25mi';
      assert.equal(convertHandler.getNum(input), '30');
      done();
    });
    it('Fractional Input w/ Decimal', function(done) {
      const input = '.78840/70.46kg';
      assert.equal(convertHandler.getNum(input), '0.011189327277888165');
      done();
    });
    it('Invalid Input (double fraction)', function(done) {
      const input = '890/736/25L';
      assert.equal(convertHandler.getNum(input), 'Invalid Number');
      done();
    });
    it('No Numerical Input', function(done) {
      const input = 'gal';
      assert.equal(convertHandler.getNum(input), '1');
      done();
    });
  });

  describe('Function convertHandler.getUnit(input)', function() {
    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele)
      });
      done();
    });
    it('Unknown Unit Input', function(done) {
      const input = 'mm';
      assert.equal(convertHandler.getUnit(input), 'Invalid Unit')
      done();
    });
  });


  describe('Function convertHandler.getReturnUnit(initUnit)', function() {
    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(element, index) {
        assert.equal(convertHandler.getReturnUnit(element).toLowerCase(), expect[index]);
      });
      done();
    });
  });  

  describe('Function convertHandler.spellOutUnit(unit)', function() {
    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(element, index) {
        assert.equal(convertHandler.spellOutUnit(element), expect[index]);
      });
      done();
    });
  });

  describe('Function convertHandler.convert(num, unit)', function() {
    it('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    it('L to Gal', function(done) {
        const input = [2.39, 'L'];
        const expected =  0.63137;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });
    it('Mi to Km', function(done) {
      const input = [26.02, 'MI'];
      const expected = 41.8750268;
      assert.equal(convertHandler.convert(input[0], input[1]), expected);
      done();
    });
    it('Km to Mi', function(done) {
      const input = [41.9, 'KM'];
      const expected = 26.02;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    it('Lbs to Kg', function(done) {
      const input = [4.03/.383, 'Lbs'];
      const expected = 4.77278;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    it('Kg to Lbs', function(done) {
      const input = [77, 'kg'];
      const expected = 169.75608035415087;
      assert.equal(convertHandler.convert(input[0], input[1]), expected);
      done();
    });
  });
});