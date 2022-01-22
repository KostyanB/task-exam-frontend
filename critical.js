const critical = require('critical');
const fs = require('fs');

function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch(e) {
        fs.mkdirSync(directory);
    }
}

critical.generate({
    base: __dirname + '/assets',
    src: 'main.html',
    width: 1920,
    height: 1080,
}).then(function (css, html, uncritical) {
    checkDirectorySync("./assets/styles/");

    fs.writeFile("./assets/styles/critical.css", css, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});