import CreditsRequest from "../models/creditsModel.js";
import User from "../models/userModel.js";

const getAllUser = async (req, res) => {
  const allUser = await User.find();

  if (!allUser) {
    res.status(404);
    throw new Error("User Is not Found ");
  }

  res.status(200).json(allUser);
};


const getAllCreditsRequests = async(req, res) => {

const getRequest = await CreditsRequest.find().populate("user")
if(!getRequest){

  req.status(404)
  throw new Error("Credits Request Is Not Found");
  
}

res.status(200).json(getRequest)

}

const adminControllers = {getAllUser , getAllCreditsRequests}

export default adminControllers