const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Project Schema
 */
const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    configurations:[{
        type: Schema.Types.ObjectId,
        ref: "Configuration"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
