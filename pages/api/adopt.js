import Pet from "../../Model/Pet";
import mongoose from "mongoose";

export default async function handler(req, res) {

    const id = req.body.id;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const adopted_pet = await Pet.findOneAndUpdate({ _id: id }, { adopted: 1 });

        adopted_pet ?
            res.status(200).json({ msg: "Adopted!" }) :
            res.status(418).json({ msg: "Did not adopt :c" });

    } catch (err) {
        console.log(err);

        res.status(500).json({ msg: "something went wrong" })
    }
}


