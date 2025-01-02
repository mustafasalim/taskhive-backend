import express from "express"
import { upload, uploadFile, getFile } from "../../controllers/file-controller"
import { verifyToken } from "../../middleware/verify-token"

const router: any = express.Router()

router.post("/upload", verifyToken, upload.single("file"), uploadFile)
router.get("/:filename", getFile)

export default router
