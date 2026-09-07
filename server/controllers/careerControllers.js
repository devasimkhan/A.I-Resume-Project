import Career from "../models/careerModel.js";
import User from "../models/userModel.js";

const createCareer = async (req, res) => {
  try {
    const { education, background, targetRole, experience, skills } = req.body;

    console.log(req.body);

    if (!education || !background || !targetRole || !skills) {
      throw new Error("Please Enter All Details...");
    }

    
    const career = await Career.create({
      user: req.user.id,
      education,
      background,
      targetRole,
      experience: experience || 0,
      skills,
    });

    if (!career) {
      res.status(409);
      throw new Error("Career Is Not Found");
    }

    res.status(201).json({
      message: "Career Created Successfully",
      career: career,
    });
  } catch (error) {
    res.status(409);
    throw new Error(error.message);
  }
};

const getMyCareer =  async(req , res) => {

   
let userId = req.user.id



    let career = await Career.findOne({user : userId}).populate("user", "-password")

    if(!career){
        res.status(404)
        throw new Error("Career is Not Found")
    }
    res.status(200).json(career)


}

const updateCareer = async (req, res) => {
  const userId = req.user.id;

  const {
    education,
    background,
    targetRole,
    experience,
    skills,
  } = req.body;

  const updateData = {};

  if (education !== undefined) updateData.education = education;
  if (background !== undefined) updateData.background = background;
  if (targetRole !== undefined) updateData.targetRole = targetRole;

  if (experience !== undefined) {
    updateData.experience = experience === "" ? 0 : experience;
  }

  if (skills !== undefined) updateData.skills = skills;

  const career = await Career.findOneAndUpdate(
    { user: userId },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!career) {
    res.status(404);
    throw new Error("Career is Not Found");
  }

  res.status(200).json({
    message: "Career profile updated successfully",
    career,
  });
};
const careerControllers = { createCareer , getMyCareer , updateCareer };

export default careerControllers;
