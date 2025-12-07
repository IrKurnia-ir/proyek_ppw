const db = require('../config/db');
const LoanModel = require('../models/LoanModel');
const BookModel = require('../models/BookModel');

exports.borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id; 
        const [books] = await BookModel.getBookById(bookId);
        if (books.length === 0) return res.status(404).json({ message: "Book not found" });
        if (books[0].stock <= 0) return res.status(400).json({ message: "Out of stock" });

        const [activeLoans] = await LoanModel.findActiveLoan(userId, bookId);
        if (activeLoans.length > 0) return res.status(400).json({ message: "You already borrowed this book" });

        await db.promise().query("UPDATE books SET stock = stock - 1 WHERE id = ?", [bookId]);
        await LoanModel.createLoan(userId, bookId);

        res.json({ message: "Book borrowed successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { loanId, bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({ message: "Book ID is missing" });
        }

        await LoanModel.returnLoan(loanId);
        await db.promise().query("UPDATE books SET stock = stock + 1 WHERE id = ?", [bookId]);

        res.json({ message: "Book returned successfully!" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
};

exports.getMyLoans = async (req, res) => {
    try {
        const userId = req.user.id;
        const [loans] = await LoanModel.getUserLoans(userId);
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};