import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectForUser = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      let decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = await User.findById(decoded.id).select("-password");

      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error("Unauthorized Access");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized Access ");
  }
};

const protectForAdmin = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }                                                                                                                                                                                                                                                                                                                                                                                                                                    

      if (user.userType == "ADMIN") {
        res.status(401);
        throw new Error("Only Admin Access");
      }

      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error("Unauthorized Access");
    }
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error.message);
    res.status(401);
    throw new Error("Unauthorized Access");
  }
};

const protect = { protectForUser  , protectForAdmin};

export default protect;
