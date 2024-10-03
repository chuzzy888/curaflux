import { Application } from "../models/application.js";
import { Hospital } from "../models/hospital.js";
import expressAsync from "express-async-handler";

export const applyForShift = expressAsync(async (req, res) => {
  const { hospitalId, userId } = req.body;

  try {
    const shift = await Hospital.findById(hospitalId);

    if (!shift) {
      return res.status(400).json({ message: "Shift not available" });
    }

    // Create a new application
    const application = new Application({ userId, hospitalId });
    await application.save();

    shift.applicants.push(application._id);
    await shift.save();
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get application for a specific hospital

export const getApplicationsForHospital = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const applications = await Application.find({ hospitalId })
      .populate("userId", "fullName email photo gender")
      .populate("hospitalId");

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this hospital" });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllApplications = expressAsync(async (req, res) => {
  const applications = await Application.find().populate("hospitalId");

  res.status(200).json({ success: true, applications });
});

// accept shifts

export const acceptApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status: "accepted" },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("hospitalId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application accepted", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// reject shifts

export const rejectApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status: "rejected" },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("hospitalId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application rejected", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
