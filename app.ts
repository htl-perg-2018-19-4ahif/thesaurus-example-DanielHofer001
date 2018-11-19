
(function () {
    let args = process.argv.slice(2);
    if (args.length > 0) {
        if (args[0] === '-i') {
            let stdin = process.openStdin();
            stdin.addListener("data", function (d) {
                console.log("you entered: [" +
                    d.toString().trim() + "]");
                if (d.toString().trim() != '/q') {
                    read(d.toString().trim());
                } else process.exit(0);
            });
        } else {
            for (let cur of args) read(cur);
        }

    } else {
        console.log("Please specify words");
    }
})();

let found: boolean = false;
function read(cur) {
    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('.\\data\\openthesaurus.txt')
    });

    lineReader.on('line', function (line) {
        findAnotherWord(line, cur);
    }).on('close', () => {
        if (!found) {
            console.log("No matches found " + cur);
        }
    });
}

function findAnotherWord(line, cur) {

    if (line.includes(cur)) {
        found = true;
        let ar = line.split(";")
        let count = 0;

        for (let i of ar) {
            if (i.includes(cur)) {
                console.log(`${i}:`);
                ar.splice(count, 1);
            }
            count++;
        }

        for (let i of ar) {
            console.log(`\t${i}`);
        }
    }
}
