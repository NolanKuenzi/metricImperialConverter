import React from 'react';
import { render, cleanup } from 'react-testing-library';
import UserStories from './userStories';

afterEach(cleanup);

describe('<UserStories Component />', () => {
  test('userStories <div> contains text', () => {
    const { getByTestId } = render(<UserStories />);
    const userStories = getByTestId('userStoriesSection');
    expect(userStories.textContent).toContain(
      "I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)",
    );
    expect(userStories.textContent).toContain(
      'I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.',
    );
  });
  test('exampleUsage <ul> contains text', () => {
    const { getByTestId } = render(<UserStories />);
    const exampleUsage = getByTestId('exampleUsage');
    expect(exampleUsage.textContent).toBe(
      '/api/convert?input=4gal/api/convert?input=1/2km/api/convert?input=5.4/3lbs/api/convert?input=kg',
    );
  });
  test('retrun <div> contains text', () => {
    const { getByTestId } = render(<UserStories />);
    const returnDiv = getByTestId('returnDiv');
    expect(returnDiv.textContent).toBe(
      "{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}",
    );
  });
});
