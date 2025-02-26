import path from "path";
import multer from "multer";
import { v4 } from "uuid";
import fs from "fs";

// Function to get storage configuration
function getTargetImageStorage(address: string) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            // Resolve the full path for the upload directory
            const uploadPath = path.join(__dirname, 'uploads', address);

            // Create the directory if it doesn't exist
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true }); // Ensure all subdirectories are created
            }

            // Set the destination for the file
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            // Generate a random file name with the correct extension
            const extension = path.parse(file.originalname).ext;
            const randomName = v4() + extension;
            cb(null, randomName);
        },
    });
}

// Create an uploader function that uses the storage configuration
const makeUploader = (address: string) => {
    const storage = getTargetImageStorage(address);
    return multer({ storage: storage });
};

export default makeUploader;
