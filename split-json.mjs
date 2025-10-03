import fs from 'fs/promises';
import path from 'path';

const inputFile = 'public/model/candidate_predictions.json';
const outputDir = 'public/model';
const recordsPerFile = 50;

async function splitJsonFile() {
  try {
    const data = await fs.readFile(inputFile, 'utf-8');
    const json = JSON.parse(data);

    if (!Array.isArray(json)) {
      console.error('Error: The JSON file does not contain an array.');
      return;
    }

    // Sort the array by prob_confirmed in ascending order
    json.sort((a, b) => a.prob_confirmed - b.prob_confirmed);

    const totalRecords = json.length;
    console.log(`Total records: ${totalRecords}`);
    const numFiles = Math.ceil(totalRecords / recordsPerFile);

    for (let i = 0; i < numFiles; i++) {
      const start = i * recordsPerFile;
      const end = start + recordsPerFile;
      const chunk = json.slice(start, end);
      const outputFile = path.join(outputDir, `candidate_predictions_${i + 1}.json`);
      await fs.writeFile(outputFile, JSON.stringify(chunk, null, 4));
      console.log(`Created ${outputFile}`);
    }

    console.log('Successfully split the JSON file.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

splitJsonFile();