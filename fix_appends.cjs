const fs = require('fs');

const scripts = [
  'append_branches.ts',
  'append_batch2.ts',
  'append_batch3.ts',
  'append_batch4.ts',
  'append_batch5.ts'
];

let content = fs.readFileSync('src/data/branches.ts', 'utf-8');

for (const script of scripts) {
  const scriptContent = fs.readFileSync(script, 'utf-8');
  // Extract the newBranches array
  const match = scriptContent.match(/const newBranches = (\[[\s\S]*?\]);/);
  if (match) {
    const branchesString = match[1];
    // Evaluate the array string to get the JS objects
    const branches = eval(branchesString);
    const newContentString = branches.map(b => JSON.stringify(b, null, 2)).join(',\n  ');
    content = content.replace(/\];[\s\n]*$/, '  ,\n  // --- Added ---\n  ' + newContentString + '\n];\n');
  }
}

fs.writeFileSync('src/data/branches.ts', content);
console.log('Fixed appends successfully.');
