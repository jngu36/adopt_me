import User from "../../Model/User";
import mongoose from "mongoose";
export default async function handler(req, res) {

  const email = req.body.email;
  const pass = req.body.password

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.create({ email: email, password: pass });

    console.log(user);

    if (user) {
      res.status(200).json({ data: data })
    } else {

      res.status(418).json({ msg: "something else happened" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" })
  }
}


