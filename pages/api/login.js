import User from "../../Model/User";
import mongoose from "mongoose";

export default async function handler(req, res) {

  const email = req.body.email;
  const pass = req.body.password

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: email, password: pass });

    if (user) {
      res.status(200).json({ data: user })
    }else{
      res.status(418).json({msg: "whoo boi!"});
    }
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ msg: "something went wrong" })
  }
}


