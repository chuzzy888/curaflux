import { Router } from "express";
import {
  acceptApplication,
  applyForShift,
  getAllApplications,
  getApplicationsForHospital,
  rejectApplication,
} from "../controllers/applicationController.js";

const router = Router();

router.post("/application", applyForShift);
router.get("/applications", getAllApplications);
router.get("/application/:hospitalId", getApplicationsForHospital);

router.patch("/application/accepted/:applicationId", acceptApplication);

router.patch("/application/rejected/:applicationId", rejectApplication);

export default router;
