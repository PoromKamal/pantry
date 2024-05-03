const express = require('express');
const { getItemId, getItem, getItems, addItem, editItem, deleteItem } = require('../db/index.js')
const { getUserByEmail } = require('../db/user.js');
const multer = require('multer');
const {scanReceipt} = require('../controllers/visionController.js');
const router = express.Router();
const upload = multer();
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

// Get all pantry items in order of closest to expiration
router.get('/items/expiring/:email?', async (req, res) => {
    console.log("HELLO")
    console.log("Porom",req.oidc.user)
    const email = req.params.email || req.oidc.user.email;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    let user;
    try {
        user = await getUserByEmail(email);
    } catch (error) {
        return res.status(400).json({ message: 'User not found' });
    }

    const { id } = user;

    console.log('Getting pantry items for user', id);
    const items = await getItems(id);
    items.sort((a, b) => {
        if (a.expiration_date === null) {
            return 1;
        }
        if (b.expiration_date === null) {
            return -1;
        }
        return a.expiration_date - b.expiration_date;
    });
    res.json(items);
});

// Get all pantry items for a user
router.get('/items/:email?', async (req, res) => {
    console.log(req.oidc.user)
    const email = req.params.email || req.oidc.user.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    let user;
    try {
        user = await getUserByEmail(email);
    } catch (error) {
        return res.status(400).json({ message: 'User not found' });
    }
    const { id } = user;
    console.log('Getting pantry items for user', id);
    const items = await getItems(id);
    res.json(items);
});

// Add pantry item
router.post('/item/:email?', async (req, res) => {
    console.log(req.oidc.user)
    const email = req.params.email || req.oidc.user.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    let user;
    try {
        user = await getUserByEmail(email);
    } catch (error) {
        return res.status(400).json({ message: 'User not found' });
    }

    const { id } = user;

    let name, quantity, price, expiration_date;
    
    if (!req.body.name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        name = req.body.name;
        quantity = req.body.quantity || 0;
        price = req.body.price || 0;
        expiration_date = req.body.expiration_date || null;
    } catch (error) {
        return res.status(400).json({ message: 'Required fields missing' });
    }
    console.log('Adding item to pantry');
    console.log(req.body);
    const newItem = await addItem(name, quantity, price, expiration_date, id);
    res.json(newItem);
});

// Add multiple pantry items
router.post('/items/:email?', async (req, res) => {
    console.log(req.oidc.user)
    const email = req.params.email || req.oidc.user.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    let user;
    try {
        user = await getUserByEmail(email);
    } catch (error) {
        return res.status(400).json({ message: 'User not found' });
    }

    const { id } = user;

    let items = req.body;
    console.log(req.body);
    if (!items) {
        return res.status(400).json({ message: 'Items are required' });
    }

    console.log('Adding items to pantry');
    console.log(items);
    const newItems = await Promise.all(items.map(async (item) => {
        const quantity = parseInt(item.quantity);
        const price = parseFloat(item.price);
        return await addItem(item.name, quantity, price, item.expiration_date, id);
    }));
    res.json(newItems);
});
  
// Edit pantry item
router.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price, expiration_date } = req.body;
    const updatedItem = await editItem(id, name, quantity, price, expiration_date);
    res.json(updatedItem);
});
  
// Delete pantry item
router.delete('/item/:name', async (req, res) => {
    console.log(req.oidc.user)
    const email = req.params.email || req.oidc.user.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    let user;
    try {
        user = await getUserByEmail(email);
    } catch (error) {
        return res.status(400).json({ message: 'User not found' });
    }

    const { id } = user;

    const { name } = req.params;
    const item_id = await getItemId(name, id);
    console.log('Deleting pantry item', item_id, name);
    await deleteItem(item_id);
    res.json({ message: 'Item deleted successfully' });
});

router.post("/scan", upload.single("receiptBuffer"), scanReceipt);

module.exports = (router);