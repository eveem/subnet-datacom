import { expect } from 'chai';
import { plus, convertToSubnet, networkClassSplit, IPtoNetworkAddress, IPtoBroadcastAddress } from './helper';

describe('test plus', () => {
  it('should plus number', () => {
    expect(plus(1, 2)).to.equal(3);
    expect(plus(0, 2)).to.equal(2);
  })
})

describe('convert subnet', () => {
  it('should convert dec to subnet', () => {
    expect(convertToSubnet(1)).to.equal("128.0.0.0");
    expect(convertToSubnet(10)).to.equal("255.192.0.0");
    expect(convertToSubnet(20)).to.equal("255.255.240.0");
    expect(convertToSubnet(32)).to.equal("255.255.255.255");
  })
})

describe('split subnet', () => {
  it('should split subnet by class', () => {
    const expectedValue = [
      `${convertToSubnet(32)} / 32`,
      `${convertToSubnet(31)} / 31`,
      `${convertToSubnet(30)} / 30`,
      `${convertToSubnet(29)} / 29`,
      `${convertToSubnet(28)} / 28`,
      `${convertToSubnet(27)} / 27`,
      `${convertToSubnet(26)} / 26`,
      `${convertToSubnet(25)} / 25`,
      `${convertToSubnet(24)} / 24`,
    ]
    const value = networkClassSplit('C');
    value.map((subnet, index) => {
      expect(subnet).to.equal(expectedValue[index]);
    });
  })
})

describe('IPtoNetworkAddress', () => {
  it('should return network address', () => {
    expect(IPtoNetworkAddress("178.233.14.6", 29)).to.equal("178.233.14.0");
    expect(IPtoNetworkAddress("129.1.11.50", 27)).to.equal("129.1.11.32");
  })
})

describe('IPtoBroadcastAddress', () => {
  it('should return broadcast address', () => {
    expect(IPtoBroadcastAddress("178.233.14.6", 29)).to.equal("178.233.14.7");
    expect(IPtoBroadcastAddress("129.1.11.50", 27)).to.equal("129.1.11.63");
  })
})