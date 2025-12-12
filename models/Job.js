const { Schema, model } = require("../connection");
 
const JobSchema = new Schema(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },

    aboutJob: { type: String, required: true },

    requirements: [{ type: String, required: true }],

    salaryType: {
      type: String,
      enum: ["Monthly", "Yearly", "Hourly"],
      required: true
    },

    salaryRange: { type: String, required: true },

    applyLink: { type: String, required: true },

    jobLocation: { type: String, default: "Not specified" },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Remote", "Hybrid", "Contract"],
      required: true
    },

    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-Level", "Senior", "Lead"],
      required: true
    },

    category: { type: String, required: true },

    skillsKeywords: [{ type: String }],

    isRemote: { type: Boolean, default: false },

    postedDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = model("Job", JobSchema);
