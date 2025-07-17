const mongoose = require('mongoose');


const scheduleQueueSchema = new mongoose.Schema({
  message: { type: String, required: true },
  scheduledFor: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});


const messageSchema = new mongoose.Schema({
    message : {type : String, required : true},
    status : {type : String , enum: ['pending', 'posted'],default: 'pending'},
    creationDate : {type : Date, default : Date.now},
    scheduledFor: { type: Date, required: true }
})

const messageQueue = mongoose.model('messageQueue',scheduleQueueSchema)
const messageScheduler = mongoose.model('messageScheduler',messageSchema)
module.exports = {messageQueue,messageScheduler};