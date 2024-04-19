import Pet from "../../Model/Pet";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const p_type = req.body.pet_type;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const pets = await Pet.find({ pet_type: p_type });

        if (pets) {
            res.status(200).json({ pets: pets })
        } else {
            res.status(418).json({ msg: `No ${p_type}` });
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({ msg: "something went wrong" })
    }
}


