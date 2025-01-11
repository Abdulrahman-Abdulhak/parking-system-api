const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});