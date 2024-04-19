import User from "../../Model/User";
import mongoose from "mongoose";
export default async function handler(req, res) {

  const email = req.body.email;
  const pass = req.body.password

  console.log("regisering: ", email, pass);

  try {
    
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.find({ email: email });

    if (user.length === 0) {
      await User.create({ email: email, password: pass });
      res.status(200).json({msg: "Success!"})
    }else{
      res.status(418).json({msg: "Failure!"})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" })
  }
}


