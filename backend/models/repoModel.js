import mongoose, { Schema } from "mongoose";

const RepositorySchema = new Schema({
   
    name: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
    },
    content: [
        {
        type: String,
        },
    ],
    visibility: {
        type: Boolean,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issues: [
        {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        },
    ],
    },
     { timestamps: true }
);

RepositorySchema.index({ owner: 1, name: 1 }, { unique: true });

const Repository = mongoose.model("Repository", RepositorySchema);


export default Repository;