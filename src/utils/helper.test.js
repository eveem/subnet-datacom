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
  binaryMask,
  networkClass,
  ipType,
  CIDRnotation,
  shortIP, 
  binaryID, 
  integerID, 
  hexID,
  networkFix,
  allPossibleNetwork } from './helper';

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
    expect(IPtoNetworkAddress("0.0.0.0", 14)).to.equal("0.0.0.0");
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
    expect(dectoIP(0)).to.equal("0.0.0.0");
    expect(dectoIP(1)).to.equal("0.0.0.1");
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

describe('networkClass', () => {
  it('should return network class', () => {
    expect(networkClass("1")).to.equal("None");
    expect(networkClass("15")).to.equal("A");
    expect(networkClass("16")).to.equal("B");
    expect(networkClass("24")).to.equal("C");
    expect(networkClass("32")).to.equal("C");
  })
})

describe('ipType', () => {
  it('should return public or private', () => {
    expect(ipType("10.0.0.0")).to.equal("Private");
    expect(ipType("10.1.2.3")).to.equal("Private");
    expect(ipType("10.255.255.255")).to.equal("Private");
    expect(ipType("172.16.0.0")).to.equal("Private");
    expect(ipType("172.25.24.255")).to.equal("Private");
    expect(ipType("172.31.255.255")).to.equal("Private");
    expect(ipType("192.168.0.0")).to.equal("Private");
    expect(ipType("192.168.199.25")).to.equal("Private");
    expect(ipType("192.168.255.255")).to.equal("Private");
    expect(ipType("255.255.255.255")).to.equal("Public");
  })
})

describe('CIDRnotation', () => {
  it('should return / number CIDR from subnet', () => {
    expect(CIDRnotation("255.255.255.0 / 24")).to.equal("/24");
    expect(CIDRnotation("128.0.0.0 / 1")).to.equal("/1");
  })
})

describe('shortIP', () => {
  it('should return ip add CIDR', () => {
    expect(shortIP("158.108.12.31", "/1")).to.equal("158.108.12.31/1");
    expect(shortIP("158.108.12.111", "/29")).to.equal("158.108.12.111/29");
  })
})

describe('binaryID', () => {
  it('should return ip in binary', () => {
    expect(binaryID("128.0.0.0")).to.equal("10000000000000000000000000000000");
    expect(binaryID("255.255.255.255")).to.equal("11111111111111111111111111111111");
    expect(binaryID("255.1.1.255")).to.equal("11111111000000010000000111111111");
  })
})

describe('integerID', () => {
  it('should return ip in decimal', () => {
    expect(integerID("10000000000000000000000000000000")).to.equal(2147483648);
    expect(integerID("11111111111111111111111111111111")).to.equal(4294967295);
    expect(integerID("11111111000000010000000111111111")).to.equal(4278256127);
    expect(integerID("1")).to.equal(1);
  })
})

describe('hexID', () => {
  it('should return ip in hex', () => {
    expect(hexID(2147483648)).to.equal("80000000");
    expect(hexID(4294967295)).to.equal("ffffffff");
    expect(hexID(4278256127)).to.equal("ff0101ff");
    expect(hexID(1)).to.equal("1");
  })
})

describe('networkFix', () => {
  it('should return ip with fix position', () => {
    expect(networkFix(0, "158.108.11.23")).to.equal("*.*.*.*");
    expect(networkFix(8, "158.108.11.23")).to.equal("158.*.*.*");
    expect(networkFix(16, "158.108.11.23")).to.equal("158.108.*.*");
    expect(networkFix(32, "158.108.11.23")).to.equal("158.108.11.*");
  })
})

describe('allPossibleNetwork', () => {
  it('should return all network possible split from cidr', () => {
    // allPossibleNetwork(3, "158.108.11.23");
    // allPossibleNetwork(11, "158.108.11.23");
    // allPossibleNetwork(16, "158.108.11.23");
    allPossibleNetwork(32, "158.108.11.23");
  })
})