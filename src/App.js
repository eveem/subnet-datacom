import React, { Component } from 'react';
import { Button, Dropdown, Form, Radio, Input } from 'semantic-ui-react';
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
    ip: '',
    check: false
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
  handleInput = (event) => {
    this.setState({
      ip: event.target.value
    })
  }
  handleClick = (e) => {
    this.setState({
      check: true
    })
  }
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.setState({
        check: true
      })
    }
  }
  render() {
    console.log(this.state.check);
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
        <Dropdown 
          placeholder='select IP' 
          search selection options={this.state.subnetList} 
          name='subnet' 
          value={this.state.subnetList.value}
          onChange={this.handleChangeDropdown} 
        />
        <Input 
          focus placeholder='IP Address'
          label='IP Address'
          value={this.state.ip}
          onChange={this.handleInput}
        />
        <Button 
          onClick={this.handleClick}
          onKeyPress={this.handleKeyPress}>
          Calculate
        </Button>
      </div>
    );
  }
}

export default App;
