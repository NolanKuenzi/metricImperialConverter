/* eslint-disable */
import React from 'react';
import axios from 'axios';
import regeneratorRuntime, { async } from 'regenerator-runtime';

class FrontEnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serverString: '',
      serverData: '',
    };
  }
  getData = () => {
    const inputVal = document.getElementById('input');
    const makeReq = async () => {
      try {
        if (/[^-+/*0-9.a-zA-Z\s]/.test(inputVal.value) === true) {
          const newVal = inputVal.value.replace(/[^-+/*0-9.a-zA-Z]/g, 'IC');
          const url0 = new URL('https://whispering-bayou-48878.herokuapp.com/api/convert?'+ 'input=' + newVal);
          const response = await axios.get(url0);
          this.setState({
            serverString: response.data.string,
            serverData: response.data.initNum === undefined ? JSON.stringify(response.data.string) : JSON.stringify(response.data, null, 4),
          });
          return;
        }
        let plusSignStatus = false;
        let changedPlus;
        if (/\+/.test(inputVal.value) === true) {
          changedPlus = inputVal.value.replace(/\+/g, 'plusSign');
          plusSignStatus = true;
        }
        const url1 = new URL('https://whispering-bayou-48878.herokuapp.com/api/convert?'+ 'input=' + (plusSignStatus === true ? changedPlus : inputVal.value));
        const response = await axios.get(url1);
        this.setState({
          serverString: response.data.string,
          serverData: response.data.initNum === undefined ? JSON.stringify(response.data.string) : JSON.stringify(response.data, null, 4),
        });
      } catch (error) {
        console.log(error);
      }
    };
    makeReq();
  }
  render() {
    return (
      <div data-testid="frontEndDiv" id="frontEndSection">
        <div id="frontEndContent">
          <h2>Front-End:</h2>
          <div>
            <input id="input" type="text" placeholder="3.1mi" name="input" />
            <button type="submit" id="convertButton" data-testid="convertButtonTest" onClick={() => this.getData()}>Convert!</button>
          </div>
        <div>
          <p id="serverString" data-testid="serverStringTest">{this.state.serverString}</p>
          <p id="serverData" data-testid="serverDataTest">{this.state.serverData}</p>
        </div>
        </div>
      </div>
     );
   }
};
export default FrontEnd;