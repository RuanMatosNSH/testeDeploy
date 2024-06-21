import { Router } from "express";
import { occCreateProfileController, occUpdateProfileController } from "../controllers";

const router = Router();

router.post("/profiles", occCreateProfileController);
router.put("/profiles/current", occUpdateProfileController);

export default router;
