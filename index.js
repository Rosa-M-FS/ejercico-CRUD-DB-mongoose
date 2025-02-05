const express = require('express');
const { dbConnection } = require('./config/config');
const tasksRoutes = require('./routes/tasks');
const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/tasks', tasksRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
