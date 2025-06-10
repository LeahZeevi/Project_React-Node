const cron = require('node-cron');
const { assignTicketsAutomatically } = require('../controllers/assignTicketsAutomatically');

cron.schedule('0 0 * * *', () => {
  console.log('Runs every day at 12 midnight');
  assignTicketsAutomatically();
});
