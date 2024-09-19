document.getElementById('submitBtn').addEventListener('click', function() {
    const codeType = document.getElementById('codeType').value;
    const code = document.getElementById('codeInput').value;
    
    let result = '';
    
    if (codeType === 'cpp') {
        result = removeCppComments(code);
    } else if (codeType === 'python') {
        result = removePythonComments(code);
    }
    
    document.getElementById('output').textContent = result;
});

function removeCppComments(code) {
    const lines = code.split('\n');
    let result = '';
    let inMultilineComment = false;

    for (let line of lines) {
        let currLine = '';
        for (let col = 0; col < line.length; ) {
            if (inMultilineComment) {
                if (col < line.length - 1 && line[col] === '*' && line[col + 1] === '/') {
                    inMultilineComment = false;
                    col += 2;
                } else {
                    col++;
                }
            } else if (col < line.length - 1 && line[col] === '/' && line[col + 1] === '/') {
                break; // Skip line comments
            } else if (col < line.length - 1 && line[col] === '/' && line[col + 1] === '*') {
                inMultilineComment = true;
                col += 2;
            } else {
                currLine += line[col++];
            }
        }
        if (currLine.trim().length > 0) {
            result += currLine + '\n';
        }
    }
    return result.trim();
}

function removePythonComments(code) {
    const lines = code.split('\n');
    let result = '';
    let inMultilineComment = false;

    for (let line of lines) {
        let currLine = '';
        for (let col = 0; col < line.length; ) {
            if (inMultilineComment) {
                if (col < line.length - 2 && line[col] === '"' && line[col + 1] === '"' && line[col + 2] === '"') {
                    inMultilineComment = false;
                    col += 3;
                } else {
                    col++;
                }
            } else if (col < line.length && line[col] === '#') {
                break; // Skip line comments
            } else if (col < line.length - 2 && line[col] === '"' && line[col + 1] === '"' && line[col + 2] === '"') {
                inMultilineComment = true;
                col += 3;
            } else {
                currLine += line[col++];
            }
        }
        if (currLine.trim().length > 0) {
            result += currLine + '\n';
        }
    }
    return result.trim();
}
