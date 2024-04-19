import Pet from "../../Model/Pet";
import mongoose from "mongoose";

export default async function handler(req, res) {
    try {
        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const type = req.body.pet_type;

        console.log(name, age, gender, type)


        await mongoose.connect(process.env.MONGODB_URI);
        const pet = await Pet.create({ name: name, age: age, gender: gender, pet_type: type });

        if (pet) {
            res.status(200).json({ pet: pet })
        } else {
            res.status(418).json({ msg: "Something bad happened!" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }

}
