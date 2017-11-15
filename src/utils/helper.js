export const plus = (x, y) => x + y;

export const convertToSubnet = n => {
    var str = "";
    str += "1".repeat(n);
    str += "0".repeat(32 - n);

    var ans = "";
    for (var i = 0; i < 4; i++) {
        ans += parseInt(str.substr(8 * i, 8), 2);
        if (i != 3) {
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
        if (i != 3) {
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
        if (i != 3) {
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
    return n != 1 ? n - 2 : n - 1;
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
        if (i != 3) {
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