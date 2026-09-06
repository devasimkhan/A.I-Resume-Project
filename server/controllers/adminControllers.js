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

const updateCreditRequest = async (req, res) => {
  try {
    const { status } = req.body;

    // Credit request ki ID
    const request = await CreditsRequest.findById(req.params.rid);

    if (!request) {
      res.status(404);
      throw new Error("Request Is Not Found");
    }

    // JIS USER NE REQUEST KI HAI
    const user = await User.findById(request.user);

    if (!user) {
      res.status(404);
      throw new Error("User Is Not Found");
    }

    // Admin ne grant kiya
    if (status === "granted") {
      user.credits = user.credits + request.credits;

      await user.save();
    }

    // Request ka status update
    request.status = status;

    // Kis admin ne approve/reject kiya
    request.processedBy = req.user.id;

    await request.save();

    res.status(200).json({
      message: "Credit request updated successfully",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: "Credit request update failed",
      error: error.message,
    });
  }
};

const adminControllers = {getAllUser , getAllCreditsRequests , updateCreditRequest}

export default adminControllers