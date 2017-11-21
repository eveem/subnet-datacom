import React, { Component } from 'react';
import { Button, Dropdown, Form, Radio, Input, Table, Header, Grid } from 'semantic-ui-react';
import { networkClassSplit, 
         IPtoNetworkAddress,
         IPtoBroadcastAddress, 
         usableRange, 
         totalHost,
         totalUsableHost,
         convertToSubnet,
         wildcardMask,
         binaryMask,
         networkClass,
         CIDRnotation,
         ipType,
         shortIP,
         binaryID,
         integerID,
         hexID,
         allPossibleNetwork } from './utils/helper.js';

function generateSubnet(c) {
  let subnetList = networkClassSplit(c);
  let result = subnetList.map((subnet, i) =>
    ({ key: i,
      value: 32 - i,
      text: subnet
    })
  )
  // console.log(result);
  return result;
}

class App extends Component {
  state = {
    networkType: ['Any', 'A', 'B', 'C'],
    networkClass: 'Any',
    subnetList: generateSubnet('Any'),
    mask: 1,
    ip: '158.128.0.23',
    check: false,
  };
  handleChangeRadio = (e, { value }) => {
    this.setState({ 
      subnetList: generateSubnet(value),
      networkClass: value
    })
  }
  handleChangeDropdown = (e, { value }) => {
    // console.log('mask', value);
    this.setState({ 
      mask: value,
      subnet: this.state.subnetList[32 - value].text
    })
  }
  handleInput = (event) => {
    // console.log('ip', event.target.value);
    this.setState({
      ip: event.target.value,
    })
  }
  handleClick = (e) => {
    const { ip, mask, subnet } = this.state;
    this.setState({
      check: true,
      ipshow: ip,
      networkAddress: IPtoNetworkAddress(ip, mask),
      broadcastAddress: IPtoBroadcastAddress(ip, mask),
      usable: usableRange(IPtoNetworkAddress(ip, mask), IPtoBroadcastAddress(ip, mask)),
      totalhost: totalHost(IPtoNetworkAddress(ip, mask), IPtoBroadcastAddress(ip, mask)),
      totalusablehost: totalUsableHost(totalHost(IPtoNetworkAddress(ip, mask), IPtoBroadcastAddress(ip, mask))),
      subnetmask: convertToSubnet(mask),
      wildcardmask: wildcardMask(subnet),
      binmask: binaryMask(convertToSubnet(mask)),
      networkclass: networkClass(mask),
      cidr: CIDRnotation(subnet),
      iptype: ipType(ip),
      shortip: shortIP(ip, CIDRnotation(subnet)),
      binaryid: binaryID(ip),
      integerid: integerID(binaryID(ip)),
      hexid: hexID(integerID(binaryID(ip))),
      allpos: allPossibleNetwork(mask, ip)
    })
  }
  
  render() {
    return (
      <div className="App">
        <h1></h1>
        <Grid centered columns={5}>
        <Grid.Column>
        <h1>IP Subnet Calculator</h1>
        </Grid.Column>
        </Grid>
        <Grid centered>
        <Grid.Column width={4}>
        <Form>
          <Form.Group inline>
          <label>Network class</label>
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
          </Form.Group>
        </Form>
        </Grid.Column>
        </Grid>
        <Grid centered columns={5}>
        <Grid.Column>
        <Input 
          focus placeholder='IP Address'
          label='IP Address'
          value={this.state.ip}
          onChange={this.handleInput}
        />
        </Grid.Column>
        </Grid>
        <Grid container centered>
        <Grid.Column width={3}>
        <Dropdown
          placeholder='Select subnet' 
          fluid search selection options={this.state.subnetList} 
          name='subnet' 
          value={this.state.subnetList.key}
          onChange={this.handleChangeDropdown} 
        />
        </Grid.Column>
        <Grid.Column width={2}>
            <Button 
              onClick={this.handleClick}>
              Calculate
            </Button>
        </Grid.Column>
        </Grid>
        <div className="Result" >
        { this.state.check &&
            <span>
              <Table basic='very' celled collapsing>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          IP Address
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.ipshow}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Network Address
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.networkAddress}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Broadcast Address
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.broadcastAddress}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Usable host IP range
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.usable}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Total number of hosts
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.totalhost}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Total number of usable hosts
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.totalusablehost}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Subnet mask
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.subnetmask}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Wildcard mask
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.wildcardmask}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Binary subnet mask
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.binmask}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          IP class
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.networkclass}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          CIDR Notation
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.cidr}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          IP type
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.iptype}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Short
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.shortip}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Binary ID
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.binaryid}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Integer ID
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.integerid}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4'>
                        <Header.Content>
                          Hex ID
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.hexid}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </span>
        }
        </div>
        <div className="allpossible">
        {/* <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          { this.state.check ?
            this.state.allpos.map((result) =>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            )
            :
            ''
          }
          </Table.Body>
        </Table> */}
        </div>
      </div>
    );
  }
}

export default App;
