/*
*
*
*       Complete the handler logic below
*       
*       
*/
const math = require('mathjs');
function ConvertHandler() {
  
  this.getNum = function(input) {
    let lastDigitCounter;
    let getLastDigit = input.split("");
    for (let i = 0; i < getLastDigit.length; i++) {
    if (/[\d]/.test(getLastDigit[i]) === true) {
        lastDigitCounter = getLastDigit.lastIndexOf(getLastDigit[i]);
      }
    }
    let rtrnNumb = getLastDigit.slice(0, lastDigitCounter + 1).join("");
    if (rtrnNumb === "") {
      rtrnNumb = '1';
      return rtrnNumb;
    }
    if (/[^-+/*0-9.]/.test(rtrnNumb) === true) {
      rtrnNumb = "Invalid Number";
      return rtrnNumb;
    }
    if (/[-+*/.]/.test(rtrnNumb) === true) {
      if (/\/.*\//.test(rtrnNumb) === true) {
        rtrnNumb = "Invalid Number";
        return rtrnNumb;
      }
      if (/(\+|\-|\*){2}/.test(rtrnNumb) === true) {
        rtrnNumb = "Invalid Number";
        return rtrnNumb;
      }
    }
    try {
      rtrnNumb = math.eval(rtrnNumb).toString();
    } catch(err) {
      rtrnNumb = "Invalid Number";
      return rtrnNumb;
    }
    return rtrnNumb;
  };

  this.getUnit = function(input) {
    input = input.replace(/\s/g, "");
    let lastDigitCounter;
    let getLastDigit = input.split("");
    for (let i = 0; i < getLastDigit.length; i++) {
      if (/[\d]/.test(getLastDigit[i]) === true) {
        lastDigitCounter = getLastDigit.lastIndexOf(getLastDigit[i]);
      }
    }
    let validUnit = getLastDigit.slice(lastDigitCounter + 1).join("");
    const regX_Unit = /^(gal|L|lbs|kg|mi|km)$/i;
    if (regX_Unit.test(validUnit.toLowerCase()) === false) {
      validUnit = "Invalid Unit";
    }
    return validUnit;
  };

  this.getReturnUnit = function(initUnit) {
    const converter = [
      ['gal', 'L'],
      ['lbs', 'kg'],
      ['mi', 'km'],
    ];
    let correctUnit;
    converter.forEach(function(item) {
      if (item[0].toLowerCase() === initUnit.toLowerCase()) {
        correctUnit = item[1];
      }
      if (item[1].toLowerCase() === initUnit.toLowerCase()) {
        correctUnit = item[0];
      }
    });
    return correctUnit;
  };

  this.spellOutUnit = function(unit) {
    const units = [
      ['gal', 'gallons'],
      ['L', 'liters'],

      ['lbs', 'pounds'],
      ['kg', 'kilograms'],

      ['mi', 'miles'],
      ['km', 'kilometers'],
    ];
    let rtrnUnit;
    units.forEach(function(item) {
      if (item[0].toLowerCase() === unit.toLowerCase()) {
        rtrnUnit = item[1];
      }
    });
    return rtrnUnit;
  };

  this.convert = function(initNum, initUnit) {
    const converter = [
      ['gal', initNum * 3.78541],
      ['L', initNum / 3.78541],
      
      ['lbs', initNum * 0.453592],
      ['kg', initNum / 0.453592],

      ['mi', initNum * 1.60934],
      ['km', initNum / 1.60934],
    ];
    let rtrnVal;
    converter.forEach(function(item) {
      if (initUnit.toLowerCase() === item[0].toLowerCase()) {
        rtrnVal = item[1];
      }
    });
   return rtrnVal;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    function getNumber(input) {
      input = input.toString();
      if (input.indexOf('.') !== -1) {
        if (input.length > 5) {
          input = parseFloat(input).toFixed(5).toString();
        }
        return input;
      }
      return input; 
      } 
      initNum = getNumber(initNum);
      returnNum = getNumber(returnNum);
      const string = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
      return string;
  }
}

module.exports = ConvertHandler;