import { Request, Response } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads"
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    )
  },
})

// File filter function
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Accept images and documents
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type"))
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const fileUrl = `${
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`
    }/uploads/${req.file.filename}`

    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      url: fileUrl,
    })
  } catch (error) {
    res.status(500).json({ message: "Error uploading file" })
  }
}

export const getFile = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params
    const filePath = path.join("uploads", filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" })
    }

    res.sendFile(path.resolve(filePath))
  } catch (error) {
    console.error("File retrieval error:", error)
    return res.status(500).json({ message: "Error retrieving file" })
  }
}
