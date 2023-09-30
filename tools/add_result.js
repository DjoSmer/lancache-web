const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

if (process.argv.length < 2) {
    console.log('Fil - not found file');
}

const DATABASE_FILE_NAME = path.join(__dirname, '../db.json');
const filepath = process.argv[2] || '_not_';
const data = {filepath};

//console.log('Parsing', filepath);

rl.on('line', (line) => {
    const [key, value] = line.split(':');

    if (value) {
        data[key.trim().toLocaleLowerCase()] = value.trim().replaceAll(
            '"', '');
    }
    else {

        console.log('Value is null', value);
    }
});

rl.once('close', () => {
    const db = fs.existsSync(DATABASE_FILE_NAME) ? require(DATABASE_FILE_NAME) : {};

    const keyParts = data.key.split('/');
    const [name, bytes] = keyParts.at(-1).split('bytes=');

    const [start] = bytes.split('-');
    keyParts[keyParts.length - 1] = name;

    keyParts.reduce((a, v) => {
        if (!a[v]) a[v] = {};

        if (name === v) {
            a[v][start] = data;
        }

        return a[v]
    }, db);

    fs.writeFileSync(DATABASE_FILE_NAME, JSON.stringify(db));
});