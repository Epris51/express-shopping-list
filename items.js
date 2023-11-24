const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

// GET /items - List all items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items - Add new item
router.post('/', (req, res) => {
    items.push(req.body);
    res.status(201).json({ added: req.body });
});

// GET /items/:name - Get single item
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    res.json(foundItem);
});

// PATCH /items/:name - Update item
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (req.body.name) foundItem.name = req.body.name;
    if (req.body.price) foundItem.price = req.body.price;
    res.json({ updated: foundItem });
});

// DELETE /items/:name - Delete item
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
});

module.exports = router;
