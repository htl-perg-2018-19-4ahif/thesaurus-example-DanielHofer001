(function () {
    var args = process.argv.slice(2);
    if (args.length > 0) {
        if (args[0] === '-i') {
            var stdin = process.openStdin();
            stdin.addListener("data", function (d) {
                console.log("you entered: [" +
                    d.toString().trim() + "]");
                if (d.toString().trim() != '/q') {
                    read(d.toString().trim());
                }
                else
                    process.exit(0);
            });
        }
        else {
            for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                var cur = args_1[_i];
                read(cur);
            }
        }
    }
    else {
        console.log("Please specify words");
    }
})();
var found = false;
function read(cur) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('.\\data\\openthesaurus.txt')
    });
    lineReader.on('line', function (line) {
        findAnotherWord(line, cur);
    }).on('close', function () {
        if (!found) {
            console.log("No matches found " + cur);
        }
    });
}
function findAnotherWord(line, cur) {
    if (line.includes(cur)) {
        found = true;
        var ar = line.split(";");
        var count = 0;
        for (var _i = 0, ar_1 = ar; _i < ar_1.length; _i++) {
            var i = ar_1[_i];
            if (i.includes(cur)) {
                console.log(i + ":");
                ar.splice(count, 1);
            }
            count++;
        }
        for (var _a = 0, ar_2 = ar; _a < ar_2.length; _a++) {
            var i = ar_2[_a];
            console.log("\t" + i);
        }
    }
}
