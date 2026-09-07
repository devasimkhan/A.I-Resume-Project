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

    const request = await CreditsRequest.findById(req.params.rid);

    if (!request) {
      return res.status(404).json({
        message: "Request Is Not Found",
      });
    }

    // Request already processed hai
    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request already processed",
      });
    }

    // Only valid status
    if (status !== "granted" && status !== "rejected") {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // Request karne wala user
    const user = await User.findById(request.user);

    if (!user) {
      return res.status(404).json({
        message: "User Is Not Found",
      });
    }

    // Grant hone par credits add
    if (status === "granted") {
      user.credits = user.credits + request.credits;
      await user.save();
    }

    // Request update
    request.status = status;

    // Admin ki ID
    request.processedBy = req.user.id;

    await request.save();

    return res.status(200).json({
      message: "Credit request updated successfully",
      request,
      credits: user.credits,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Credit request update failed",
      error: error.message,
    });
  }
};

const adminControllers = {getAllUser , getAllCreditsRequests , updateCreditRequest}

export default adminControllers