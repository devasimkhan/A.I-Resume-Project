import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    use :{
    type : mongoose.Schema.Types.ObjectId , 
    ref  : "User" ,
     required : true
    } ,
        fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
    },

    originalName: {
      type: String,
    },

    extractedText: {
      type: String,
    },

    atsScore: {
      type: Number,
    },

    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
    },


} ,  {
    timestamps : true
})