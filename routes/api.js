/*
*
*       Complete the API routing below
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { query, sanitizeQuery } = require('express-validator');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();
  app.route('/api/convert?')
    .get([
       sanitizeQuery('input')
        .customSanitizer(function(input) {
          input = input.replace(/\s/g, "");
          return escape(input);
        })
    ],
    function (req, res) {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      if (initNum === 'Invalid Number' && initUnit === 'Invalid Unit')  {
        res.sendStatus(400).json({string: 'Invalid Number and Unit'});
        return;
      }
      if (initUnit === 'Invalid Unit') {
        res.status(200).json({string: 'Invalid Unit'});
        return;
      }
      if (initNum === 'Invalid Number') {
        res.status(200).json({string: 'Invalid Number'});
        return;
      }
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.status(200).json({initNum: JSON.parse(initNum), initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
    });
};
