const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.post("/add", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json({ success: true, job });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = req.query.query;

    if (!q || q.trim() === "") {
      return res.json({ success: true, results: [] });
    }

    const results = await Job.find(
      {
        $or: [
          { jobTitle: { $regex: q, $options: "i" } },
          { companyName: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
          { skillsKeywords: { $regex: q, $options: "i" } }
        ]
      },
      "jobTitle companyName category" // Only send these fields for speed
    ).limit(8);

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.get("/jobs", async (req, res) => {
  try {
    const {
      search,
      salaryType,
      experienceLevel,
      jobLocation,
      isRemote,
      category,
    } = req.query;

    let filter = {};

    // Search by companyName or jobTitle
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
      ];
    }

    if (salaryType) filter.salaryType = salaryType;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (jobLocation) filter.jobLocation = jobLocation;
    if (category) filter.category = category;

    if (isRemote === "true") filter.isRemote = true;
    if (isRemote === "false") filter.isRemote = false;

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json({ ok: true, jobs });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

router.get("/autocomplete", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const suggestions = await Job.find(
      {
        $or: [
          { jobTitle: { $regex: q, $options: "i" } },
          { companyName: { $regex: q, $options: "i" } }
        ]
      },
      "jobTitle companyName"
    ).limit(8);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
