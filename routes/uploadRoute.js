const express = require("express");
const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");
const router = express.Router();

router.post("/upload", async (req, res) => {
  if ((!req.files || !req.files.file)) {
    return res.status(400).json({ error: "No file found" });
  }

  const file = req.files.file;
  const uploadedFilePath = path.join(
    __dirname,
    "../uploads",
    `upload-${Date.now().csv}`
  );

  try {
    await file.mv(uploadedFilePath);
    const worker = new Worker(
      path.join(__dirname, "../workers/uploadWorkers.js"),
      {
        workerData: { filePath: uploadedFilePath },
      }
    );
    worker.on("message", (msg) => {
      res.status(200).json({ status: "File Uploaded.", data: msg });
      fs.unlinkSync(uploadedFilePath);
    });
    worker.on("error", (err) => {
      console.log("Worker thread error:", err);
      res.status(500).json({ error: "Worker failed" });
    });
    worker.on("exit", (code) => {
      if (code !== 0) {
        console.log(`Exit code : ${code}`);
      }
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({errorMsg : "File Not Uploaded "})
  }
});

module.exports = router;
