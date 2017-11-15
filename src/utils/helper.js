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