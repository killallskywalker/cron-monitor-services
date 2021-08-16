const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Configuration Schema
 */
const ConfigurationSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    jobName:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: false
    },
    health:{
        type: Boolean,
        default: false
    },
    frequency: {
        type: String,
        required: true,
    },
    lastCheck:{
        type: Date,
        default : null
    },
    email:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);
