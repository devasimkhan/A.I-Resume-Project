import Career from "../models/careerModel.js";
import CreditsRequest from "../models/creditsModel.js";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import Resume from "../models/resumeModel.js";

const getAllUser = async (req, res) => {
  const allUser = await User.find();

  if (!allUser) {
    res.status(404);
    throw new Error("User Is not Found ");
  }

  res.status(200).json(allUser);
};


const getAllCreditsRequests = async (req, res) => {
  try {
    const requests = await CreditsRequest
      .find()
      .populate("user", "-password");

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Credit requests not found",
      });
    }

    return res.status(200).json(requests);

  } catch (error) {
    return res.status(500).json({
      message: "Failed to get credit requests",
      error: error.message,
    });
  }
};

const updateCreditRequest = async (req, res) => {
  try {
 
     const { status } = req.body;
    const { rid } = req.params;

    if (status !== "granted" && status !== "rejected") {
      return res.status(400).json({
        message: "Status must be granted or rejected",
      });
    }

  
    const request = await CreditsRequest.findById(rid);

    if (!request) {
      return res.status(404).json({
        message: "Credit request not found",
      });
    }

    // 3. Already processed check
    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Credit request already processed",
      });
    }

    // 4. User find
    const user = await User.findById(request.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 5. If granted → add credits
    if (status === "granted") {
      user.credits += request.credits;

      await user.save();
    }

    // 6. Update request
    request.status = status;
    request.processedBy = req.user.id;

    await request.save();

    // 7. Response
    return res.status(200).json({
      message: `Credit request ${status} successfully`,
      request,
      currentCredits: user.credits,
    });

  } catch (error) {
    console.error("UPDATE CREDIT ERROR:", error);

    return res.status(500).json({
      message: "Credit request update failed",
      error: error.message,
    });
  }
};



const getCareer = async(req, res) => {

  const career = await Career.find().populate("user")

  if(!career){

    res.status(404)
    throw new Error("Career Is Not Found");
    
  }
  res.status(200).json(career)

}

const getAllResume = async(req, res)=> {

  const resumes = await Resume.find().populate("user") 

  if(!resumes){
    res.status(404)
    throw new Error("Resume Is Not Found");
    
  }
  res.status(200).json({
    success : true ,
    count : resumes.length ,
    resumes
  })
}


export const createJob = async (req, res, next) => {
    try {
        const {
            title,
            company,
            location,
            jobType,
            experience,
            skills,
            description
        } = req.body;

        if (
            !title ||
            !company ||
            !location ||
            !jobType ||
            experience === undefined ||
            !skills ||
            !description
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            jobType,
            experience,
            skills,
            description
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });

    } catch (error) {
        next(error);
    }
};
 const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        next(error);
    }
};
 const updateJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        next(error);
    }
};
 const deleteJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
const adminControllers = {getAllUser , getAllCreditsRequests , updateCreditRequest , getCareer ,  getAllResume ,createJob , getAllJobs , updateJob , deleteJob}

export default adminControllers