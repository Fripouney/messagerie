import express from 'express';
import { createPool } from 'mysql2';

export function connect() {
  const connection = createPool({
    host: 'localhost',
    user: 'root',
    database: 'messagerie'
  })

  return connection;
}

const port = process.env['PORT'] || 4000;

// Start up the Node server
const server = express();
//server.use(cors);
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
