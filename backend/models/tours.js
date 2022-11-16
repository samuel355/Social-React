import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String},
    name: {type: String, required:true},
    creator: {type: String},
    tags: [String],
    imageFile: String,
    likeCount: {type: Number, default: 0}
}, {timestamps: true})

const tourModel = mongoose.model('Tour', tourSchema)

export default tourModel; 