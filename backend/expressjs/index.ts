import express from 'express';
// rest of the code remains same
const app = express();
const PORT = 5001;
app.get('/', (req, res) => res.send('Express + TypeScriptt Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});