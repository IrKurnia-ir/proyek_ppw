const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/LoanController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/borrow', authMiddleware, LoanController.borrowBook);
router.post('/return', authMiddleware, LoanController.returnBook);
router.get('/my-loans', authMiddleware, LoanController.getMyLoans);

module.exports = router;