import CreditsRequest from "../models/creditsModel.js";
import User from "../models/userModel.js";

const creditsRequest = async (req, res) => {
  const userId = req.user.id;

  const { credits, reason } = req.body;

  if (!credits || !reason) {
    res.status(400);
    throw new Error("Please enter all details");
  }

  // Check existing pending request
  const existingRequest = await CreditsRequest.findOne({
    user: userId,
    status: "pending",
  });

  if (existingRequest) {
    res.status(400);
    throw new Error("You already have a pending credit request");
  }

  const creditRequest = await CreditsRequest.create({
    user: userId,
    credits,
    reason,
  });

  if (!creditRequest) {
    res.status(400);
    throw new Error("Credit request was not created");
  }

  res.status(201).json({
    message: "Credit request sent successfully",
    creditRequest,
  });
};

const getCreditsHistory = async (req, res) => {
  try {
    const userId = req.params.rid;
    const getHistory = await CreditsRequest.find({ user: userId }).populate(
      "user",
      "-password",
    );
    if (getHistory.length === 0) {
      res.status(404);
      throw new Error("Credits history not found");
    }
    return res.status(200).json(getHistory);
  } catch (error) {
    res.status(409);
    throw new Error("Credits Fetch Failed");
  }
};


const creditsControllers = {
  creditsRequest,
  getCreditsHistory,
};

export default creditsControllers
