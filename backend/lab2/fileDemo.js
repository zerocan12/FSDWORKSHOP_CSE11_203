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

async function appendFile(contentToAppend) {
  try {
    await fs.appendFile(filepath, contentToAppend, 'utf8');
    console.log('Content appended successfully');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}

async function deleteFile() {
  try {
    await fs.unlink(filepath);
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting file:', err);
  }
}

createFile("this is a test file content");
readFile();
appendFile("\nThis is additional content.");
deleteFile();