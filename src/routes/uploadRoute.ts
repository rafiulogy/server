import { Router } from "express";
import FileUploadController from "../controllers/FileUploadController";
const router = Router();

router.post("/", FileUploadController.upload);

export default router;
