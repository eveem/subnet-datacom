import React, { Component } from 'react';
import { Button, Dropdown, Form, Radio, Input, Table, Header, Grid, Image, Segment, Message, Icon, Body, Divider } from 'semantic-ui-react';
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
    subnet: '128.0.0.0 / 1',
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
        <Grid
          color='teal'
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon circular name='calculator' />
              {' '}IP Subnet Calculator
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input centered style={{'justify-content': 'space-around', 'margin-bottom':'-10px'}}>
                  <Form.Group inline fluid>
                    <Header as='label' color='teal'>Network class</Header>
                      { this.state.networkType.map((c) =>
                      <Form.Field>
                        <Radio
                          name='radioGroup'
                          value={c}
                          checked={this.state.networkClass === c}
                          onChange={this.handleChangeRadio}
                        />
                        <Header as='p' color='teal'>{c}</Header>
                      </Form.Field>
                      )}
                  </Form.Group>
                </Form.Input>
                <Input style={{'margin-bottom':'10px'}}
                  action={{ color: 'teal', labelPosition: 'left', icon: 'linkify', content: 'IP Address' }}
                  actionPosition='left'
                  fluid
                  placeholder='IP Address'
                  value={this.state.ip}
                  onChange={this.handleInput}
                />
                <Dropdown style={{'margin-bottom':'10px'}}
                  placeholder='Select subnet' 
                  fluid search selection options={this.state.subnetList} 
                  name='subnet' 
                  value={this.state.subnetList.key}
                  onChange={this.handleChangeDropdown} 
                />
                <Button color='teal' fluid size='large' onClick={this.handleClick}>Calculate</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <div className="Result" >
        { this.state.check &&
            <Grid
            color='teal'
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 535 }}>
              <Header as='h3' color='teal' textAlign='center' style={{'margin-top':'40px'}}>
                <Icon name='list layout' />
                {' '}Results
              </Header>
              <Divider />
              <Table celled collapsing style={{'display':'flex'}} selectable>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4' color='teal'>
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
                      <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
                    <Header as='h4' color='teal'>
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
            </Grid.Column>
          </Grid>
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
