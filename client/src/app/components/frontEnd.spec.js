/* eslint-disable */

import React from 'react';
import { render, cleanup, fireEvent, wait} from 'react-testing-library';
import FrontEnd from './frontEnd';
import regeneratorRuntime, { async } from 'regenerator-runtime';


jest.mock('axios');
afterEach(cleanup);

describe('<FrontEnd /> component', () => {
  test('Button element contains the text "Convert"', () => {
    const { getByTestId } = render(<FrontEnd />);
    const frontEndDiv = getByTestId('frontEndDiv');
    expect(frontEndDiv.textContent).toContain('Convert!');
  });
  test('Data renders correctly after fetch', async () => {
    const { getByTestId } = render(<FrontEnd />);
    await wait(() => {
      const convertButton = getByTestId('convertButtonTest');
      fireEvent.click(convertButton);
      const serverStringTest = getByTestId('serverStringTest');
      const serverDataTest = getByTestId('serverDataTest');
      expect(serverStringTest.textContent).toBe('3 kilograms converts to 72.75261 pounds');
      expect(serverDataTest.textContent).toContain("returnUnit");
      expect(serverDataTest.textContent).toContain("lbs");
      expect(serverDataTest.textContent).toContain("returnNum");
      expect(serverDataTest.textContent).toContain("72.75260586606466");
    });
  });
});