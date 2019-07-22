import React from 'react';
import Footer from './footer';

const UserStories = () => {
  return (
    <div>
      <div id="usrsStoriesSec" data-testid="userStoriesSection">
        <ol>
          <li>I will help prevent the client from trying to guess(sniff) the MIME type.</li>
          <li>I will prevent cross-site scripting (XSS) attacks.</li>
          <li>
            I can GET /api/convert with a single parameter containing an accepted number and unit
            and have it converted.
          </li>
          <li>Hint: Split the input by looking for the index of the first character.</li>
          <li>
            I can convert {"'gal'"} to {"'L'"} and vice versa. <b>(1 gal to 3.78541 L)</b>
          </li>
          <li>
            I can convert {"'lbs'"} to {"'kg'"} and vice versa. <b>(1 lbs to 0.453592 kg)</b>
          </li>
          <li>
            I can convert {"'mi'"} to {"'km'"} and vice versa. <b>(1 mi to 1.60934 km)</b>
          </li>
          <li>If my unit of measurement is invalid, returned will be {"'invalid unit'"}.</li>
          <li>If my number is invalid, returned with will {"'invalid number'"}.</li>
          <li>If both are invalid, return will be {"'invalid number and unit'"}.</li>
          <li>
            I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing
            is provided it will default to 1.
          </li>
          <li>
            My return will consist of the initNum, initUnit, returnNum, returnUnit, and string
            spelling out units in format {'{initNum}'} {'{initial_Units}'} converts to{' '}
            {'{returnNum}'} {'{return_Units}'} with the result rounded to 5 decimals.
          </li>
          <li>All 16 unit tests are complete and passing.</li>
          <li>All 5 functional tests are complete and passing.</li>
        </ol>
      </div>
      <div id="exampleSec">
        <h3>Example Usage:</h3>
        <ul data-testid="exampleUsage" id="exampleUsageUl">
          <li>/api/convert?input=4gal</li>
          <li>/api/convert?input=1/2km</li>
          <li>/api/convert?input=5.4/3lbs</li>
          <li>/api/convert?input=kg</li>
        </ul>
        <h3>Example Return:</h3>
        <div data-testid="returnDiv" id="returnSection">
          {"{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', "}
          {"string: '3.1 miles converts to 5.00002 kilometers'}"}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserStories;
