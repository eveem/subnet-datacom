import React, { Component } from 'react';
import { Button, Dropdown, Form, Radio } from 'semantic-ui-react';
import { networkClassSplit } from './utils/helper.js';

function generateSubnet(c) {
  let subnetList = networkClassSplit(c);
  let result = subnetList.map((subnet, i) =>
    ({ key: i,
      value: subnet,
      text: subnet
    })
  )
  return result;
}

class App extends Component {
  state = {
    networkType: ['Any', 'A', 'B', 'C'],
    networkClass: 'Any',
    subnetList: generateSubnet('Any'),
    subnetNow: '255.255.255.255 / 32',
  };
  handleChangeRadio = (e, { value }) => {
    this.setState({ 
      subnetList: generateSubnet(value),
      networkClass: value
    })
  }
  handleChangeDropdown = (e, { value }) => {
    this.setState({ 
      subnetNow: value
    })
  }
  render() {
    console.log(this.state.subnetNow);
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
        <Dropdown placeholder='select IP' 
                  search selection options={this.state.subnetList} 
                  name='subnet' 
                  value={this.state.subnetList.value}
                  onChange={this.handleChangeDropdown} 
        />
      </div>
    );
  }
}

export default App;
