const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
//C
router.post('/create', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
});

// R
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});

// R
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
});

// U
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        task.check=true;
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});

// U
router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        task.title = req.body.title;  
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});

// D
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});

module.exports = router;
