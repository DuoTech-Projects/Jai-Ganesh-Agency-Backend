const express = require('express');
const serverless = require('serverless-http');
const app = express();
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const textFileRead = fs.readFileSync('./listNumber.txt', 'utf8');
  console.log(+textFileRead);
  const incrementNumber = +textFileRead + 1;
  console.log(incrementNumber);
  fs.writeFile('./listNumber.txt', incrementNumber.toString(), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ error: 'Error writing file' });
    } else {
      console.log('File written successfully');
      res.json({ 'incrementedNumber': incrementNumber });
    }
  });
});

app.use('/.netlify/functions/server', router);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

module.exports.handler = serverless(app);