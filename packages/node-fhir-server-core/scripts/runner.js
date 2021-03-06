const { initialize, loggers } = require('../src/index.js');
const config = require('../src/test.config');

let main = function () {
  let server = initialize(config);
  let logger = loggers.get();

  logger.info('FHIR Server successfully validated.');
  // Start our server
  server.listen(3000);
  logger.info('FHIR Server listening on localhost:' + 3000);
};

main();
