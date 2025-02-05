const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    body: String,
    check: {type:Boolean, default:false} 
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;