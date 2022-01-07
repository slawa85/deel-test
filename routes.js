var express = require('express');
var router = express.Router();
const contractController = require('./controllers/contractController');
const jobController = require('./controllers/jobController');
const profileController = require('./controllers/profileController');

router.get('/contracts/:id', contractController.showContract)
router.get('/contracts', contractController.getContracts)
router.get('/jobs/unpaid', jobController.unpaidJobs)
router.post('/jobs/:job_id/pay', jobController.payJob)
router.post('/balances/deposit/:userId', profileController.deposit)

module.exports = router;
