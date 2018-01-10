// Linux only, not macOS. On macOS it's os

var spawn = require("child_process").spawn;
var prc = spawn("free", []);
var os = require("os");

prc.stdout.setEncoding("utf8");
prc.stdout.on("data", function (data) {
    var lines = data.toString().split(/\n/g),
        line = lines[1].split(/\s+/),
        total = parseInt(line[1], 10),
        free = parseInt(line[3], 10),
        buffers = parseInt(line[5], 10),
        cached = parseInt(line[6], 10),
        actualFree = free + buffers + cached,
        memory = {
            total: total,
            used: parseInt(line[2], 10),
            free: free,
            shared: parseInt(line[4], 10),
            buffers: buffers,
            cached: cached,
            actualFree: actualFree,
            percentUsed: parseFloat(((1 - (actualFree / total)) * 100).toFixed(2)),
            comparePercentUsed: ((1 - (os.freemem() / os.totalmem())) * 100).toFixed(2)
        };
    console.log("memory", memory);
});

prc.on("error", function (error) {
    console.log("[ERROR] Free memory process", error);
});