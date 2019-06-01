export default {
  get: () => {
    return Promise.resolve({
      data: {
        initNum: '33',
        initUnit: 'kg',
        returnNum: '72.75260586606466',
        returnUnit: 'lbs',
        string: '3 kilograms converts to 72.75261 pounds',
      },
    });
  },
};
