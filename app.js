const express = require('express');
const itemsRoutes = require('./routes/items'); // Routes for items

const app = express();
app.use(express.json());
app.use('/items', itemsRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app; // Export for testing
