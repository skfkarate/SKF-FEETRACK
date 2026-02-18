
const fs = require('fs');

const content = fs.readFileSync('Code.gs', 'utf8');
const lines = content.split('\n');

let balance = 0;
let stack = [];

let inString = false;
let stringChar = '';
let inBlockComment = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (inBlockComment) {
            if (char === '*' && line[j + 1] === '/') {
                inBlockComment = false;
                j++;
            }
            continue;
        }

        if (inString) {
            if (char === stringChar && line[j - 1] !== '\\') {
                inString = false;
            }
            continue;
        }

        // Start of block comment
        if (char === '/' && line[j + 1] === '*') {
            inBlockComment = true;
            j++;
            continue;
        }

        // Line comment
        if (char === '/' && line[j + 1] === '/') {
            break; // Ignore rest of line
        }

        if (char === '"' || char === "'" || char === "`") {
            inString = true;
            stringChar = char;
        } else if (char === '{') {
            balance++;
            stack.push({ line: i + 1, col: j });
        } else if (char === '}') {
            balance--;
            if (balance < 0) {
                console.log(`Unexpected '}' at line ${i + 1}:${j}`);
                // process.exit(1); 
                // Don't exit, just log it might be useful to see subsequent errors
            } else {
                stack.pop();
            }
        }
    }
}

if (balance > 0) {
    console.log(`Unclosed '{' at end of file. Balance: ${balance}`);
    console.log('Unclosed braces starting at:', stack.slice(-5).map(s => `${s.line}:${s.col}`));
} else if (balance === 0) {
    console.log('Braces are perfectly balanced according to this script.');
} else {
    console.log(`More '}' than '{'. Balance: ${balance}`);
}
