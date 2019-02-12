const server = require('./server.js');

server.listen(4001, () => {
  console.log('\n*** Server running on http://localhost:4001 ***\n');
});