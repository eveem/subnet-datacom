import { expect } from 'chai';
import { plus, 
  convertToSubnet, 
  networkClassSplit, 
  IPtoNetworkAddress, 
  IPtoBroadcastAddress, 
  totalHost,
  totalUsableHost,
  binaryIPtoDec,
  usableRange,
  dectoIP,
  wildcardMask, 
  binaryMask } from './helper';

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
    expect(IPtoNetworkAddress("0.0.0.255", 14)).to.equal("0.0.0.0");
    expect(IPtoNetworkAddress("0.0.0.255", 1)).to.equal("0.0.0.0");
    expect(IPtoNetworkAddress("255.255.255.255", 1)).to.equal("128.0.0.0");
    expect(IPtoNetworkAddress("178.233.14.6", 29)).to.equal("178.233.14.0");
    expect(IPtoNetworkAddress("129.1.11.50", 27)).to.equal("129.1.11.32");
    expect(IPtoNetworkAddress("255.255.255.255", 32)).to.equal("255.255.255.255");
  })
})

describe('IPtoBroadcastAddress', () => {
  it('should return broadcast address', () => {
    expect(IPtoBroadcastAddress("0.0.0.255", 14)).to.equal("0.3.255.255");
    expect(IPtoBroadcastAddress("0.0.0.255", 1)).to.equal("127.255.255.255");
    expect(IPtoBroadcastAddress("255.255.255.255", 1)).to.equal("255.255.255.255");
    expect(IPtoBroadcastAddress("178.233.14.6", 29)).to.equal("178.233.14.7");
    expect(IPtoBroadcastAddress("129.1.11.50", 27)).to.equal("129.1.11.63");
    expect(IPtoBroadcastAddress("255.255.255.255", 32)).to.equal("255.255.255.255");
  })
})

describe('totalHost', () => {
  it('should return total host', () => {
    expect(totalHost("128.0.0.0", "255.255.255.255")).to.equal(2147483648);
    expect(totalHost("255.255.255.255", "255.255.255.255")).to.equal(1);
  })
})

describe('totalUsableHost', () => {
  it('should return total host', () => {
    expect(totalUsableHost(2147483648)).to.equal(2147483646);
    expect(totalUsableHost(1)).to.equal(0);
  })
})

describe('binaryIPtoDec', () => {
  it('should return ip in decimal', () => {
    expect(binaryIPtoDec("128.0.0.0")).to.equal(2147483648);
    expect(binaryIPtoDec("255.255.255.255")).to.equal(4294967295);
    expect(binaryIPtoDec("255.240.0.0")).to.equal(4293918720);
  })
})

describe('usableRange', () => {
  it('should return string of usable IP', () => {
    expect(usableRange("255.255.255.255", "255.255.255.255")).to.equal("None");
    expect(usableRange("255.240.0.0", "255.255.255.255")).to.equal("255.240.0.1 - 255.255.255.254");
  })
})

describe('dectoIP', () => {
  it('should return IP from decimal', () => {
    expect(dectoIP(4294967294)).to.equal("255.255.255.254");
    expect(dectoIP(4293918721)).to.equal("255.240.0.1");
  })
})

describe('wildcardMask', () => {
  it('should return wildcard mask', () => {
    expect(wildcardMask("255.240.0.0")).to.equal("0.15.255.255");
    expect(wildcardMask("255.248.0.0")).to.equal("0.7.255.255");
  })
})

describe('binaryMask', () => {
  it('should return binary subnet mask', () => {
    expect(binaryMask("255.248.0.0")).to.equal("11111111.11111000.00000000.00000000");
    expect(binaryMask("255.0.0.0")).to.equal("11111111.00000000.00000000.00000000");
    expect(binaryMask("128.0.0.0")).to.equal("10000000.00000000.00000000.00000000");
  })
})