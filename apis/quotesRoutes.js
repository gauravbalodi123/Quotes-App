const router = require('express').Router();
const Quotes = require('../models/quotes');


router.get('/allquotes', async (req, res) => {
    
    try {
        const allQuotes = await Quotes.find({});
        res.status(200).json(allQuotes);
    }
    catch (e) {
        res.status(400).json({ msg: 'Something Went Wrong!!!' });
    }
});



router.post('/addQuotes', async (req, res) => {
    
    const {author,text} = req.body;
    await Quotes.create({author,text});
    res.status(200).json({ msg: 'New Quote Created Successfully' });
});


router.get('/quotes/:id', async(req, res) => {
    const quote = await Quotes.findById(req.params.id);
    res.status(200).json(quote);
});



router.delete('/quotes/:id', async (req, res) => {
    try {
        const deletedQuote = await Quotes.findByIdAndDelete(req.params.id);
        if (!deletedQuote) {
            return res.status(404).json({ msg: 'Quote not found.' });
        }
        res.status(200).json({ msg: 'Quote deleted successfully.' });
    } catch (error) {
        res.status(400).json({ msg: 'Something went wrong!' });
        console.error(error);
    }
});


router.patch('/quotes/:id', async (req, res) => {
    try {
        const { author, text } = req.body;
        const updatedFields = { author, text };
        if (author) updatedFields.author = author;
        if (text) updatedFields.text = text;
        const updatedQuote = await Quotes.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!updatedQuote) {
            return res.status(404).json({ msg: 'Quote not found.' });
        }
        res.status(200).json({ msg: 'Quote updated successfully.', updatedQuote });
    } catch (error) {
        res.status(400).json({ msg: 'Something went wrong!' });
        console.error(error);
    }
});

module.exports = router;