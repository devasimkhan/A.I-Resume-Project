import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jtw from "jsonwebtoken"

const userRegister = async (req, res) => {
  const { name, email, password, location } = req.body;

  if (!name || !email || !password || !location) {
    res.status(409);
    throw new Error("Please Fill All Details");
  }

  let emailExist = await User.findOne({ email: email });

  if (emailExist) {
    res.status(409);
    throw new Error("User ALL Ready Exist");
  }

  const salt = bcrypt.genSaltSync(10);

  const hashPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    location,
  });

  if (!user) {
    rer.status(409);
    throw new Error("User is not Created");
  }

  res.status(201).json({
        _id : user._id ,
         name : user.name ,
         email : user.email ,
         userType : user.userType ,
         location : user.location ,
         credits : user.credits ,
         createdAt : user.createdAt ,
         token : generateToken(user._id)

    });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(409);
    throw new Error("Please Enter All Details..");
  }

  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(201).json( {
        _id : user._id ,
         name : user.name ,
         email : user.email ,
         userType : user.userType ,
         location : user.location ,
         credits : user.credits ,
         createdAt : user.createdAt ,
         token : generateToken(user._id)

    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
};

const privateController = (req , res) => {

    res.json({
        message : "Request Made By " + req.user.name
    })

}

const generateToken = (id) => {

    return jtw.sign({id} , process.env.JWT_SECRET , {expiresIn: "30d"}) 
}

const authControllers = {
  userRegister,
  userLogin,
  privateController ,
};

export default authControllers;




// export const login=async(req,res)=>{
//    const {email,password} =req.body 
//    const user=await User.find({email})
//    if(!user){
//     res.status(400).json({
//       mesaage:"user not5 found"
//     })
//    }
//   return jtw.sign({id} , process.env.JWT_SECRET , {expiresIn: "30d"}) 
// }
