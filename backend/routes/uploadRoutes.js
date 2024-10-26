import fs from "fs";
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Images only!");
    // cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    // Normalize the path using path.posix to ensure forward slashes
    const imagePath = path.posix.join(
      "/",
      req.file.path.split(path.sep).join("/")
    );

    // Removes / from in front of the upload word
    // const imagePath = req.file.path.split(path.sep).join("/");

    res.status(200).send({
      message: "Image uploaded successfully",
      image: imagePath,
      // image: `/${req.file.path}`,
    });
    console.log(req.file.path, imagePath);
    const __dirname = path.resolve();
    console.log("Full image path:", path.join(__dirname, req.file.path));
    const imagePath2 = path.join(__dirname, req.file.path);
    console.log("Image exists:", fs.existsSync(imagePath2));
  });
});

export default router;
