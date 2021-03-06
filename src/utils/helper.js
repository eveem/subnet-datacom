export const plus = (x, y) => x + y;

export const convertToSubnet = n => {
    var str = "";
    str += "1".repeat(n);
    str += "0".repeat(32 - n);

    var ans = "";
    for (var i = 0; i < 4; i++) {
        ans += parseInt(str.substr(8 * i, 8), 2);
        if (i !== 3) {
            ans += ".";
        }
    }
    return ans;
}

export const networkClassSplit = c => {
    var ans = [];
    for (var i = 32; i >= 1; i--) {
        ans.push(convertToSubnet(i) + ' / ' + i);
    }
    if (c === "A") {
        ans = ans.slice(0, 25);
    }
    else if (c === "B") {
        ans = ans.slice(0, 17);
    }
    else if (c === "C") {
        ans = ans.slice(0, 9);
    }
    return ans;
}

export const IPtoNetworkAddress = (ip, n) => {
    var binaryIP = "", 
    numberIP = ip.split(".").map((function(elm) {
        var temp = (+elm).toString(2);
        var zero = "0".repeat(8 - temp.length);
        binaryIP += zero + temp;
        return binaryIP;
    }));

    var networkIP = binaryIP.substr(0, n);
    networkIP += "0".repeat(32 - n);

    var ans = "";
    for (var i = 0; i < 4; i++) {
        ans += parseInt(networkIP.substr(8 * i, 8), 2);
        if (i !== 3) {
            ans += ".";
        }
    }
    return ans;
}

export const IPtoBroadcastAddress = (ip, n) => {
    var binaryIP = "", 
    numberIP = ip.split(".").map((function(elm) {
        var temp = (+elm).toString(2);
        var one = "0".repeat(8 - temp.length);
        binaryIP += one + temp;
        return binaryIP;
    }));

    var boardcastIP = binaryIP.substr(0, n);
    boardcastIP += "1".repeat(32 - n);

    var ans = "";
    for (var i = 0; i < 4; i++) {
        ans += parseInt(boardcastIP.substr(8 * i, 8), 2);
        if (i !== 3) {
            ans += ".";
        }
    }
    return ans;
}

export const totalHost = (networkIP, broadcastIP) => {
    var ndec = binaryIPtoDec(networkIP), bdec = binaryIPtoDec(broadcastIP);
    var total = bdec - ndec + 1;
    return total;
}

export const totalUsableHost = n => {
    return n !== 1 ? n - 2 : n - 1;
}

export const usableRange = (networkIP, broadcastIP) => {
    if (totalHost(networkIP, broadcastIP) <= 2) {
        return "None";
    }
    else {
        var ndec = binaryIPtoDec(networkIP) + 1;
        var bdec = binaryIPtoDec(broadcastIP) - 1;
        var startIP = dectoIP(ndec);
        var endIP = dectoIP(bdec);
        return startIP + " - " + endIP;
    }
}

export const dectoIP = n => {
    var binary = n.toString(2);
    var zero = "0".repeat(32 - binary.length);
    binary = zero + binary;
    var ans = "";
    for (var i = 0; i < 4; i++) {
        ans += parseInt(binary.substr(8 * i, 8), 2);
        if (i !== 3) {
            ans += ".";
        }
    }
    return ans;
}

export const binaryIPtoDec = ip => {
    var binaryIP = iptoBinary(ip);
    
    var binary = "";
    binaryIP.forEach(function(elm) {
        binary += elm;
    });

    var dec = parseInt(binary, 2);
    return dec;
}

export const iptoBinary = ip => {
    var binaryIP = ip.split(".").map((function(elm) {
        var temp = (+elm).toString(2);
        var zero = "0".repeat(8 - temp.length);
        return zero + temp;
    }));
    return binaryIP;
}

export const wildcardMask = ip => {
    var binaryIP = iptoBinary(ip), ans = "";
    binaryIP.forEach(function(elm) {
        for (var i = 0; i < elm.length; i++) {
            if (elm[i] === "1")
                ans += "0";
            else
                ans += "1";
        }
    });
    var wildcard = dectoIP(parseInt(ans, 2));
    return wildcard;
}

export const binaryMask = ip => {
    var binaryIP = iptoBinary(ip);
    binaryIP = binaryIP.join(".");
    return binaryIP;
}

export const networkClass = n => {
    var ans = ["None", "A", "B", "C", "C"];
    return ans[parseInt(n/8)];
}

export const ipType = ip => {
    var dec = binaryIPtoDec(ip);
    if ((dec >= 167772160 && dec <= 184549375) || (dec >= 2886729728 && dec <= 2887778303) || (dec >= 3232235520 && dec <= 3232301055))
        return "Private";
    else
        return "Public";
    return ip;
}

export const CIDRnotation = subnet => {
    var ans = subnet.split(' ');
    return "/" + ans[2];
}

export const shortIP = (ip, cidr) => {
    return ip + cidr;
}

export const binaryID = ip => {
    var ans = iptoBinary(ip).join('');
    return ans;
}

export const integerID = bin => {
    var ans = parseInt(bin, 2);
    return ans;
}

export const hexID = dec => {
    var ans = dec.toString(16);
    return ans;
}

export const networkFix = (cidr, ip) => {
    var ans = "";
    var temp = ip.split('.');
    if (cidr < 8) {
        temp[0] = "*";
        temp[1] = "*";
        temp[2] = "*";
        temp[3] = "*";
    }
    else if (cidr < 16) {
        temp[1] = "*";
        temp[2] = "*";
        temp[3] = "*";
    }
    else if (cidr < 24) {
        temp[2] = "*";
        temp[3] = "*";
    }
    else if (cidr <= 32) {
        temp[3] = "*";
    }
    ans = temp.join('.');
    return ans;
}

export const allPossibleNetwork = (cidr, ip) => {
    if (cidr === 32)
        cidr = 31;
    var group = parseInt(cidr/8);
    ip = iptoBinary(ip);
    ip = ip.join('');
    
    var seedIP = ip.substr(0, group*8);
    // console.log(seedIP);

    var startIP = [];
    var endIP = [];
    var useableIP = [];
    for (var i = 0; i < 2**(cidr%8); i++) {
        var b2 = i.toString(2);
        if (b2.length <= (cidr%8)) {
            b2 = "0".repeat((cidr%8) - b2.length) + b2;
        }
        var sb2 = seedIP + b2, eb2 = seedIP + b2;
        sb2 += "0".repeat(32 - sb2.length);
        eb2 += "1".repeat(32 - eb2.length);

        // console.log(eb2);

        var sintIP = parseInt(sb2, 2), eintIP = parseInt(eb2, 2);
        startIP.push(dectoIP(sintIP));
        endIP.push(dectoIP(eintIP));
            
        var stuse = dectoIP(sintIP + 1), eduse = dectoIP(eintIP - 1);
        if (sintIP + 1 < eintIP - 1) {
            useableIP.push(stuse + " - " + eduse);
        }
        else {
            useableIP.push('None');
        }
    }
    // console.log(startIP);
    // console.log(useableIP);
    // console.log(endIP);
    var result = {
        startIP,
        useableIP,
        endIP
    }
    return result;
}

export const isIPv4 = (ip) => {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  }