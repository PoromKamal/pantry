const express = require('express');
const { scanReceipt } = require('../services/visionService');
const { getItem, getItems, addItem, editItem, deleteItem } = require('../db/index.js')
const { protected } = require('../middleware/auth.js');
const router = express.Router();

// router.post("/scanReceipt", scanReceipt);

router.get('/', async (req, res) => {
    res.send('pantry');
});

// Get pantry item
router.get('/item/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Getting pantry item', id)
    const item = await getItem(id);
    res.json(item);
});

// Get all pantry items for a user
router.get('/items/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log('Getting pantry items for user', user_id);
    const items = await getItems(user_id);
    res.json(items);
});
  
// Add pantry item
router.post('/item', async (req, res) => {
    const { name, quantity = 0, price = 0, expiration_date = null, user_id } = req.body;
    console.log('Adding item to pantry');
    console.log(req.body);
    const newItem = await addItem(name, quantity, price, expiration_date, user_id);
    res.json(newItem);
});
  
// Edit pantry item
router.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price, expiration_date } = req.body;
    const updatedItem = await editItem(id, name, quantity, price, expiration_date);
    res.json(updatedItem);
});
  
// Delete pantry item
router.delete('/item/:id', async (req, res) => {
    const { id } = req.params;
    await deleteItem(id);
    res.json({ message: 'Item deleted successfully' });
});

module.exports = (router);