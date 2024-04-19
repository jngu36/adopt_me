import User from "../../Model/User";
import mongoose from "mongoose";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {

  const email = req.body.email;
  const pass = req.body.password

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: email, password: pass });

    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.status(200).json({ token });
    }else{
      res.status(418).json({msg: "whoo boi!"});
    }
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ msg: "something went wrong" })
  }
}


