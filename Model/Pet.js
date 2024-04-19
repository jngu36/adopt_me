import { Schema, model, models } from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    pet_type: {
        type: String,
        required: true
    },
    adopted: {
        type: Boolean,
        
    }
});

const Pet = models.Pet || model("Pet", petSchema);

export default Pet;