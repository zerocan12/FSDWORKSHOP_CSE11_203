import fs from 'node:fs/promises';

const filepath = 'userData.txt';
const content = 'fs.read';

async function createFile(contentToWrite) {
  try {
    await fs.writeFile(filepath, contentToWrite, 'utf8');
    console.log('File created successfully');
  } catch (err) {
    console.error('Error creating file:', err);
  }
}

async function readFile() {
  try {
    const data = await fs.readFile(filepath, 'utf8');
    console.log('File contents:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

createFile("this is a test file content");
readFile("this is a test file content");