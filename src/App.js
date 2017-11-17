import React, { Component } from 'react';
import { Button, Dropdown, Form, Radio } from 'semantic-ui-react';
import { networkClassSplit } from './utils/helper.js';

function generateSubnet(c) {
  return networkClassSplit(c);
}

class App extends Component {
  state = {
    networkType: ['Any', 'A', 'B', 'C'],
    networkClass: 'Any',
    subnetList: generateSubnet('Any')
  };
  handleChangeRadio = (e, { value }) => {
    this.setState({ 
      subnetList: generateSubnet(value),
      networkClass: value
    })
  }
  render() {
    console.log(this.state.subnetList);
    return (
      <div className="App">
        <h1>IP Subnet Calculator</h1>
        <Form>
        { this.state.networkType.map((c) =>
            <Form.Field>
              <Radio
                label={c}
                name='radioGroup'
                value={c}
                checked={this.state.networkClass === c}
                onChange={this.handleChangeRadio}
              />
            </Form.Field>
        )}
        </Form>
      </div>
    );
  }
}

export default App;
