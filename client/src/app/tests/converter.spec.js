/* eslint-disable */

import React from 'react';
import { render, cleanup, fireEvent, wait} from 'react-testing-library';
import Converter from '../containers/converter';
import regeneratorRuntime, { async } from 'regenerator-runtime';


jest.mock('axios');
afterEach(cleanup);

describe('<FrontEnd /> component', () => {
  test('Button element contains the text "Convert"', () => {
    const { getByTestId } = render(<Converter />);
    const frontEndDiv = getByTestId('converterDiv');
    expect(frontEndDiv.textContent).toContain('Convert!');
  });
  test('Data renders correctly after axios call', async () => {
    const { getByTestId } = render(<Converter />);
    await wait(() => {
      const convertButton = getByTestId('convertButtonTest');
      const serverDataTest = getByTestId('serverDataTest');
      expect(serverDataTest.textContent).toContain("Initial Number");
      expect(serverDataTest.textContent).toContain("Initial Unit");
      expect(serverDataTest.textContent).toContain("Return Number");
      expect(serverDataTest.textContent).toContain("Return Unit");
      fireEvent.click(convertButton);
      expect(serverDataTest.textContent).toContain("33");
      expect(serverDataTest.textContent).toContain("kg");
      expect(serverDataTest.textContent).toContain("72.75260586606466");
      expect(serverDataTest.textContent).toContain("lbs");
      const serverStringTest = getByTestId('serverStringTest');
      expect(serverStringTest.textContent).toBe('3 kilograms converts to 72.75261 pounds');
    });
  });
});