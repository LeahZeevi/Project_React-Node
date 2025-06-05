const cron = require('node-cron');
const { assignTicketsAutomatically } = require('../controllers/assignTicketsAutomatically');

cron.schedule('0 0 * * *', () => {
  console.log('רץ כל יום ב12 בלילה');
  assignTicketsAutomatically();
});
