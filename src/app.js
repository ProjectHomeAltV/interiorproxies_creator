var path = require("path");
var glob = require('glob');
var fs = require('fs');

createFile();

function createFile() {  
    fs.writeFileSync('../output/interiorsproxies.meta', `<?xml version="1.0" encoding="UTF-8"?>\n\n<SInteriorOrderData>
    <startFrom value="2000" />
    <filePathHash value="0" />
    <proxies>
    `);

    appendYTD()
}

function appendYTD() {
    glob("../input/**/**.ymap", function (er, files) {
        let ii = 0;
        for (i=0; i < files.length; i++) {
            var name = path.basename(files[i])
            var name2 = name.replace('.ymap', "")
            if (!name.includes('milo_')) continue;
            fs.appendFile('../output/interiorsproxies.meta', (ii == 0 ? "  ".repeat(2) : "  ".repeat(4)) + '<Item>' + name2 + '</Item>\n', function (err) {
                if (err) {
                    console.log('An error occured.');
                } else {
                    return;
                }
            });

            if (i == files.length-1) {
                setTimeout(() => {
                    fs.appendFile('../output/interiorsproxies.meta', "  ".repeat(2) + '</proxies>\n</SInteriorOrderData>', function(err) {
                        if (err) {
                            console.log('An error occured.');
                        } else {
                            return;
                        }
                    });
                }, 1000);
            }

            ii += 1;
            console.log(name2)
        }

        console.log('\nA resource has been created at ../output/interiorsproxies.meta')

        setTimeout(() => {
            process.exit();
        }, 2000);
    })
}
