import mongoose, { Schema } from "mongoose";

// Define the schema
const HospitalSchema = new Schema(
  {
    adsNote: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String, 
      required: true,
    },
    payRate: {
      type: Number, // change later to string 
      required: true,
    },
    specialization: { //skills and expertise[] change later
      type: String,
      required: true,
    },
    licenseRequired: { // remove from schema
      type: String, 
      required: true,
    },

    hospital: {
      type: mongoose.Types.ObjectId,
      ref: "Healthcare",
      required: true,
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Hospital = mongoose.model("Hospital", HospitalSchema);

// Export the model

//  to include 
// jobType
// specialRequirement
// shift supervisor, name, position, email, phoneNumber