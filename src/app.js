var path = require("path");
var glob = require('glob');
var fs = require('fs');



glob("../input/**/**.ymap", function (er, files) {
    for (i = 0; i < files.length; i++) {
        var raw = path.dirname(path.dirname(files[i]))
        while (path.basename(raw) === 'assets' || path.basename(raw) === 'stream')
            raw = path.dirname(raw)
        var name = raw
        var name2 = path.basename(files[i]).replace('.ymap', "")
        if (!name2.includes('milo_')) continue;
        if (name2.includes('gabz')) continue;
        createInteriorProxy(name, name2)
    }
    setTimeout(() => {
        process.exit();
    }, 2000);
})


function createInteriorProxy(name, name2) {
    console.log('-- ' + name + ' -- ' + name2 + ' --')
    fs.writeFileSync('../input/' + name + '/stream/interiorsproxies.meta', `<?xml version="1.0" encoding="UTF-8"?>\n\n<SInteriorOrderData>
    <startFrom value="2000" />
    <filePathHash value="0" />
    <proxies>
    `, function () {});
    fs.appendFile('../input/' + name + '/stream/interiorsproxies.meta', "  ".repeat(2) + '<Item>' + name2 + '</Item>\n', function () {});
    setTimeout(() => {
        fs.appendFile('../input/' + name + '/stream/interiorsproxies.meta', "  ".repeat(2) + '</proxies>\n</SInteriorOrderData>', function () {});
    }, 1000);
}
