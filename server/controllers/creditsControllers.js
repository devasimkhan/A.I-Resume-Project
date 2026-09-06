import CreditsRequest from "../models/creditsModel.js";

const creditsRequest = async (req, res) => {
  const userId = req.user.id;

  const { credits, reason } = req.body;

  if (!credits || !reason) {
    res.status(400);
    throw new Error("Please enter all details");
  }

  if (credits < 1) {
    res.status(400);
    throw new Error("Credits must be at least 1");
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

const creditsControllers = {
  creditsRequest,
};

export default creditsControllers;