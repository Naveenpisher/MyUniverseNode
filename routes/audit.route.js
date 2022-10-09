const express = require('express');
const router = express.Router();
const AuditController = require('./../controllers/audit.controller');

router.get('/identifications', AuditController.getIdentifications)
router.get('/addresses', AuditController.getAddresses)


module.exports = router;