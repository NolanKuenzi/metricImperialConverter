import React from 'react';
import axios from 'axios';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import UserStories from '../components/userStories';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverString: '',
      initNumber: '',
      initUnit: '',
      rtrnNum: '',
      rtrnUnit: '',
      userStoriesIcon: false,
    };
  }

  getData = () => {
    const inputVal = document.getElementById('input');
    const makeReq = async () => {
      const setData = (serverString, serverData) => {
        this.setState({
          serverString,
          initNumber: serverData === null ? null : serverData.initNum,
          initUnit: serverData === null ? null : serverData.initUnit,
          rtrnNum: serverData === null ? null : serverData.returnNum,
          rtrnUnit: serverData === null ? null : serverData.returnUnit,
        });
      };
      try {
        const url = new URL(
          `https://whispering-bayou-48878.herokuapp.com/api/convert?input=${encodeURIComponent(
            inputVal.value,
          )}`,
        );
        const response = await axios.get(url);
        const responseData = response.data.initNum === undefined ? null : response.data;
        setData(response.data.string, responseData);
      } catch (error) {
        console.log(error);
        setData(error.response.data.string, null);
      }
    };
    makeReq();
  };

  userStoriesToggle = () => {
    const { userStoriesIcon } = this.state;
    if (userStoriesIcon === false) {
      this.setState({
        userStoriesIcon: true,
      });
    } else {
      this.setState({
        userStoriesIcon: false,
      });
    }
  };

  keyPressed = e => {
    if (e.key === 'Enter') {
      this.getData();
    }
  };

  render() {
    const { serverString, initNumber, initUnit, rtrnNum, rtrnUnit, userStoriesIcon } = this.state;
    return (
      <div data-testid="converterDiv" id="dataSection">
        <h1>Metric-Imperial-Converter</h1>
        <div>
          <span className="units">'gal' converts to 'L' and vice versa</span>
          <br />
          <span className="units">'lbs' converts to 'kg' and vice versa</span>
          <br />
          <span className="units">'mi' converts to 'km' and vice versa</span>
          <br />
        </div>
        <div id="tableSection" data-testid="serverDataTest">
          <table>
            <tbody>
              <tr>
                <th className="num">Initial Number</th>
                <th className="unit">Initial Unit</th>
                <th className="num">Return Number</th>
                <th className="unit">Return Unit</th>
              </tr>
              <tr>
                <td className="num">{initNumber}</td>
                <td className="unit">{initUnit}</td>
                <td className="num">{rtrnNum}</td>
                <td className="unit">{rtrnUnit}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="inputSection">
          <div>
            <input id="input" type="text" placeholder="3.1mi" name="input" />
            <br />
            <button type="submit" data-testid="convertButtonTest" onClick={() => this.getData()}>
              Convert!
            </button>
          </div>
          <div>
            <p id="dataString" data-testid="serverStringTest">
              {serverString}
            </p>
          </div>
        </div>
        <div id="userStories">
          <div id="usrStriesHandler" onClick={() => this.userStoriesToggle()}>
            <span>User Stories </span>
            <span id="arrowSpan">{userStoriesIcon === false ? '▼' : '▲'}</span>
          </div>
          <div>{userStoriesIcon === false ? null : <UserStories />}</div>
        </div>
      </div>
    );
  }
}
export default Converter;
